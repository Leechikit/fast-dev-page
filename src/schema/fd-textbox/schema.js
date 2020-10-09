/*
 * @Description: 单行文本组件
 * @Autor: Lizijie
 * @Date: 2020-06-11 17:52:46
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-09 10:29:18
 */
const Textbox = {
  name: 'FdTextbox',
  label: '单行文本组件',
  icon: 'textbox',
  tips: '',
  component: {
    class: 'fd-textbox',
    props: {},
    style: {},
    children: null,
    on: {},
    nativeOn: {}
  },
  configs: {
    label: {
      name: 'ConfigInput',
      label: '控件名称',
      value: '单行文本'
    },
    labelVisible: {
      name: 'ConfigSwitch',
      label: '显示控件名称',
      value: true
    }
  },
  layout: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 400,
    defaultWidth: 800,
    defaultHeight: 80
  },
  rules: {
    required: false,
    message: ''
  }
}

export default Textbox
