<!--
 * @Description: 组件
 * @Autor: Lizijie
 * @Date: 2020-03-24 17:24:14
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-11 10:27:15
-->
<script>
import Utils from '@/helper/utils'
export default {
  name: 'FdComponent',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(h) {
    const { name, children } = this.data
    const property = Utils.getVNodeProps(this.data)
    const VNode = children
      ? children.map(child => {
          return h('FdComponent', {
            props: {
              data: child
            }
          })
        })
      : []
    const { padding: paddingArrs } = property.props
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = paddingArrs
    return h(
      'div',
      {
        class: 'fd-component',
        style: {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          overflow: 'hidden'
        }
      },
      [h(name, property, VNode)]
    )
  }
}
</script>
