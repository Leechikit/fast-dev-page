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
    return h(name, property, VNode)
  }
}
</script>
