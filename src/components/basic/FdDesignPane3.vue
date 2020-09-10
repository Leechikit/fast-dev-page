<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-10 17:36:24
-->
<template>
  <el-form>
    <div class="grid-stack">
      <div
        class="grid-stack-item"
        v-for="(item, idx) in list"
        :key="idx"
        :id="item.id"
        :data-gs-x="item.x"
        :data-gs-y="item.y"
        :data-gs-width="item.width"
        :data-gs-height="item.height"
      >
        <div class="grid-stack-item-content ui-draggable-handle">
          <fd-component :key="rerender" :data="item" />
        </div>
      </div>
    </div>
  </el-form>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
import { find } from 'lodash'
export default {
  name: 'PageDesignGridstack',
  components: { FdComponent },
  props: {
    plist: {
      type: Array
    }
  },
  data() {
    return {
      grid: null,
      addLocked: false,
      list: [],
      rerender: Date.now()
      // serializedData: [
      //   { id: '1', x: 0, y: 0, width: 2, height: 2 },
      //   { id: '2', x: 2, y: 3, width: 3, height: 1 },
      //   { id: '3', x: 1, y: 3, width: 1, height: 1 }
      // ]
    }
  },
  computed: {
    ...mapState(['defaults', 'count']),
    ...mapGetters(['selectId'])
  },
  watch: {
    plist: {
      handler(newVal) {
        if (newVal) {
          this.list = newVal
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.list = this.plist
    })
    this.initGridStack()
    this.addHandler()
  },
  methods: {
    ...mapMutations(['updateSelectComponent', 'incrementCount']),
    createCompId() {
      this.incrementCount()
      const BASE = '0000000'
      return `F${BASE.slice((this.count + '').length)}${this.count}`
    },
    initGridStack() {
      this.grid = GridStack.init({
        minRow: 1,
        margin: 1,
        disableOneColumnMode: true,
        dragIn: '.sidebar-item-menu .fd-dnd-comp-item',
        dragInOptions: {
          revert: 'invalid',
          scroll: false,
          appendTo: 'body',
          helper: 'clone'
        }, // clone
        acceptWidgets: () => {
          return true
        }
      })
    },
    addHandler() {
      this.grid.on('added', (event, items) => {
        if (this.addLocked) return
        this.addLocked = true
        items.forEach(widget => {
          console.log(widget)
          const componentName = widget.el.getAttribute('data-name')
          const componentType = widget.el.getAttribute('data-type')
          const { x, y, width, height } = widget

          this.grid.removeWidget(widget.el)
          if (this.grid.willItFit(x, y, width, height, true)) {
            const id = this.createCompId()
            let item = find(this.defaults[componentType], {
              name: componentName
            })
            let component = Utils.deepClone(
              Object.assign({}, item, { x, y, width, height, id })
            )
            console.log(this.list)
            this.list.push(component)
            this.updateSelectComponent(component)
            // this.addComponent({
            //   x,
            //   y,
            //   width,
            //   height,
            //   id,
            //   name: componentName
            // })
            this.$nextTick(() => {
              this.grid.makeWidget(id)
              this.addLocked = false
            })
          } else {
            alert('Not enough free space to place the widget')
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-stack-item-content {
  background-color: red;
}
</style>
