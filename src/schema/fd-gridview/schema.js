/*
 * @Description: 子表组件
 * @Autor: Lizijie
 * @Date: 2020-06-11 17:52:46
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-16 15:37:21
 */
const Gridview = {
  name: 'FdGridview',
  label: '子表组件',
  icon: 'gridview',
  tips: '',
  configs: {
    label: {
      name: 'ConfigInput',
      label: '控件名称',
      value: '子表'
    },
    controls: {
      name: 'ConfigControls',
      label: '子表字段',
      value: []
    }
  },
  layout: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 400,
    defaultWidth: 800,
    defaultHeight: 200
  },
  props: {},
  rules: {
    required: false,
    message: ''
  },
  className: {},
  style: {},
  children: null,
  events: {
    on: {},
    nativeOn: {}
  }
}

export default Gridview
