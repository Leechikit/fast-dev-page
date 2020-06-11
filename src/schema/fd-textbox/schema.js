/*
 * @Description: 单行文本组件
 * @Autor: Lizijie
 * @Date: 2020-06-11 17:52:46
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-11 18:38:30
 */
const Textbox = {
  name: 'FdTextbox',
  label: '单行文本组件',
  icon: 'textbox',
  tips: '',
  configs: {
    label: {
      name: 'ConfigInput',
      label: '控件名称',
      value: '单行文本'
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

export default Textbox
