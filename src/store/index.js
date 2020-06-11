/*
 * @Description:
 * @Autor: Lizijie
 * @Date: 2020-03-24 15:42:47
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-10 18:15:26
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Utils from '../helper/utils'
import generate from '../schema'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'edit',
    toc: {
      PAGE: {
        id: Utils.namespace('fd.page'),
        name: 'div',
        label: '页面',
        attrs: [],
        props: {},
        className: {
          'fd-page': true
        },
        style: {},
        events: {},
        children: []
      }
    },
    tocMap: {
      PAGE: {}
    },
    defaults: {
      PAGE: generate('FdImage', 'FdCols')
    },
    count: 0,
    selectIndex: -1,
    selectId: '',
    selectComponent: null,
    pageType: '',
    dataSource: null,
    selectSource: null
  },
  mutations: {
    updateDataSource(state, data) {
      state.dataSource = data
    },
    updateSelectSource(state, data) {
      state.selectSource = data
    },
    updateSelectIndex(state, index) {
      state.selectIndex = index
    },
    updatePageToc(state, payload) {
      const { pageType, toc } = state
      toc[pageType] = payload
    },
    updatePageType(state, payload) {
      state.pageType = payload
    },
    updateSelectComponent(state, payload) {
      state.selectComponent = payload
    },
    addComponent(state, payload) {
      const { pageType, toc, selectIndex } = state
      const { children } = toc[pageType]
      children.splice(selectIndex, 0, payload)
    },
    delComponent(state) {
      const { pageType, toc, selectIndex } = state
      const { children } = toc[pageType]
      children.splice(selectIndex, 1)
    },
    updateRenderList(state, payload) {
      const { pageType, toc } = state
      toc[pageType].children = payload
    },
    incrementCount(state) {
      state.count++
    },
    updateMode(state, mode) {
      state.mode = mode
    }
  },
  getters: {
    toc: state => state.toc[state.pageType],
    tocMap: state => state.tocMap[state.pageType],
    isFormPage: state => state.pageType === 'FORM',
    isShowPage: state => state.pageType === 'SHOW',
    selectIndex: state => state.selectIndex,
    defaults: state => state.defaults,
    pageType: state => state.pageType,
    dataSource: state => state.dataSource,
    selectSource: state => state.selectSource,
    selectId: state => (state.selectComponent ? state.selectComponent.id : ''),
    selectComponent: state =>
      state.selectIndex === -1
        ? null
        : state.toc[state.pageType].children[state.selectIndex]
  },
  modules: {}
})
