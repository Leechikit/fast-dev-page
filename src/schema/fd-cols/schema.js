/*
 * @Description: 多列布局组件配置文件
 * @Autor: Lizijie
 * @Date: 2020-06-09 15:10:41
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-12 17:56:03
 */
const Cols = {
  name: 'FdCols',
  label: '多列布局组件',
  icon: 'cols',
  tips: '',
  isLayoutComponent: true,
  component: {
    class: 'fd-cols',
    props: {},
    style: {},
    children: null,
    on: {},
    nativeOn: {}
  },
  configs: {
    cols: {
      name: 'ConfigInput',
      label: '列数',
      value: 2
    },
    space: {
      name: 'ConfigInput',
      label: '间隔（px）',
      value: 0
    }
  },
  layout: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 400,
    defaultWidth: 800,
    defaultHeight: 200
  }
}

export default Cols
