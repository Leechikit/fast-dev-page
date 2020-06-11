<!--
 * @Description: 组件
 * @Autor: Lizijie
 * @Date: 2020-03-24 17:24:14
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-10 18:00:56
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
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  render(h) {
    const { name, children } = this.data
    const property = Utils.getVNodeProps(this.data, this.readonly)
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
