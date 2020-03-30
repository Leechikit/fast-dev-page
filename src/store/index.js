import Vue from 'vue'
import Vuex from 'vuex'
import Utils from '../helper/utils'
import generate from '../schema'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    defaults: {
      PAGE: generate('FdImage')
    },
    selectIndex: -1,
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
    }
  },
  getters: {
    toc: state => state.toc[state.pageType],
    isFormPage: state => state.pageType === 'FORM',
    isShowPage: state => state.pageType === 'SHOW',
    selectIndex: state => state.selectIndex,
    defaults: state => state.defaults,
    pageType: state => state.pageType,
    dataSource: state => state.dataSource,
    selectSource: state => state.selectSource,
    selectComponent: state =>
      state.selectIndex === -1
        ? null
        : state.toc[state.pageType].children[state.selectIndex]
  },
  modules: {}
})
