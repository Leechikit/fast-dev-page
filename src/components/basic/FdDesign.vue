<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-14 11:24:57
-->
<template>
  <div class="fd-design" @mouseenter.stop>
    <GridStack :options="gridstackOptions" @add="onAdd">
      <GridStackItem
        v-for="(item, idx) in list"
        :key="item.id"
        :x.sync="item.x"
        :y.sync="item.y"
        :width.sync="item.width"
        :height.sync="item.height"
        :isActive="selectId === item.id"
        @click="onSelect(item)"
      >
        <template v-slot="{ remove }">
          <fd-component :key="rerender" :data="item" readonly />
          <div class="fd-dnd-buttons">
            <div
              v-show="expandButtons"
              class="fd-dnd-buttons-item fd-dnd-buttons-copy"
              @click.stop="onCopy(idx, item)"
            >
              <fd-icon name="copy" />
            </div>
            <div
              v-show="expandButtons"
              class="fd-dnd-buttons-item fd-dnd-buttons-delete"
              @click.stop="remove(() => onDelete(idx))"
            >
              <fd-icon name="delete" />
            </div>
          </div>
        </template>
      </GridStackItem>
    </GridStack>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import GridStack from '@/components/GridStack/GridStack.vue'
import GridStackItem from '@/components/GridStack/GridStackItem.vue'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
import { find } from 'lodash'
export default {
  name: 'PageDesignGridstack',
  components: { GridStack, GridStackItem, FdComponent },
  props: {
    plist: {
      type: Array
    },
    options: {
      type: Object,
      default: () => {}
    },
    parent: Object
  },
  data() {
    return {
      grid: null,
      addLocked: false,
      list: [],
      rerender: Date.now(),
      expandButtons: true
    }
  },
  computed: {
    ...mapState(['defaults', 'count']),
    ...mapGetters(['selectId']),
    gridstackOptions() {
      const defaultOptions = {
        animate: true,
        acceptWidgets: () => true,
        dragIn: '.sidebar-item-menu .fd-dnd-comp-item',
        dragInOptions: {
          scroll: false,
          appendTo: 'body',
          helper: event => {
            this.$emit('dragIn', true)
            return event.currentTarget.cloneNode(true)
          },
          revert: () => {
            this.$emit('dragIn', false)
            return true
          }
        }
      }
      return { ...defaultOptions, ...this.options }
    }
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
  },
  methods: {
    ...mapMutations([
      'updateSelectComponent',
      'incrementCount',
      'updateRenderList'
    ]),
    createCompId() {
      this.incrementCount()
      const BASE = '0000000'
      return `F${BASE.slice((this.count + '').length)}${this.count}`
    },
    updateToc() {
      if (this.parent) {
        this.parent.children = this.list
      } else {
        this.updateRenderList(this.list)
      }
    },
    onSelect(item) {
      this.updateSelectComponent(item)
    },
    onAdd(widget, grid) {
      if (widget.el.className.includes('grid-stack-item')) return
      const componentName = widget.el.getAttribute('data-name')
      const componentType = widget.el.getAttribute('data-type')
      const { x, y } = widget
      const item = find(this.defaults[componentType], {
        name: componentName
      })
      const width = Math.ceil(item.layout.defaultWidth / 50)
      const height = Math.ceil(item.layout.defaultHeight / 20)
      grid.removeWidget(widget.el)
      if (grid.willItFit(x, y, width, height, true)) {
        const id = this.createCompId()
        const component = Utils.deepClone(
          Object.assign({}, item, { x, y, width, height, id })
        )
        this.list.push(component)
        this.updateSelectComponent(component)
        this.$nextTick(() => {
          // grid.makeWidget(id)
          this.addLocked = false
        })
      } else {
        alert('Not enough free space to place the widget')
      }
    },
    onDelete(idx) {
      this.list.splice(idx, 1)
      this.updateToc()
      const nextIdx = idx >= this.list.length ? this.list.length - 1 : idx
      this.updateSelectComponent(this.list[nextIdx])
    },
    onCopy(index, item) {
      const id = this.createCompId()
      let { height, y } = item
      let clone = Utils.deepClone(
        Object.assign({}, item, { id, y: y + height })
      )
      this.list.splice(index + 1, 0, clone)
      this.updateSelectComponent(clone)
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-design {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.fd-dnd-buttons {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 11;
  &-item {
    font-size: 12px;
    color: #fff;
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    margin-left: 5px;
  }
  &-copy {
    background-color: $--color-primary;
    &:hover {
      background-color: rgba($--color-primary, 0.8);
    }
  }
  &-delete {
    background-color: $--color-red;
    &:hover {
      background-color: rgba($--color-red, 0.8);
    }
  }
}
</style>
