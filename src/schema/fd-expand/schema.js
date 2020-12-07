/*
 * @Description: 多列布局组件配置文件
 * @Autor: Lizijie
 * @Date: 2020-06-09 15:10:41
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-12-07 17:52:50
 */
const Expand = {
  name: 'FdExpand',
  label: '展开布局组件',
  icon: 'expand',
  tips: '',
  isLayoutComponent: true,
  component: {
    class: 'fd-expand',
    props: {},
    style: {},
    children: [],
    on: {},
    nativeOn: {}
  },
  configs: {
    title: {
      name: 'ConfigInput',
      label: '控件标题',
      value: '展开收起'
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

export default Expand
