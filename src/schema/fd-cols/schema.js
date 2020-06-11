/*
 * @Description: 多列布局组件配置文件
 * @Autor: Lizijie
 * @Date: 2020-06-09 15:10:41
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-10 17:40:15
 */
const Cols = {
  name: 'FdCols',
  label: '多列布局组件',
  icon: 'cols',
  tips: '',
  configs: {
    cols: {
      name: 'ConfigInput',
      label: '列数',
      value: 2
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

export default Cols
