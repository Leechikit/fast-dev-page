<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-11 17:57:07
-->
<template>
  <div
    class="fd-design-pane"
    :class="{
      'fd-dnd-placeholder': !isDraging && list.length === 0
    }"
  >
    <el-form>
      <div class="grid-stack fd-dnd-area">
        <div
          class="grid-stack-item"
          :class="{
            'is-active': selectId === item.id
          }"
          v-for="(item, idx) in list"
          :key="idx"
          :id="item.id"
          :data-gs-x="item.x"
          :data-gs-y="item.y"
          :data-gs-width="item.width"
          :data-gs-height="item.height"
          @click.stop="onSelect(item)"
        >
          <div class="grid-stack-item-content ui-draggable-handle">
            <fd-component :key="rerender" :data="item" />
          </div>
        </div>
      </div>
    </el-form>
  </div>
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
      gridMinHeight: '0',
      addLocked: false,
      isDraging: false,
      list: [],
      rerender: Date.now()
      // list: [
      //   { id: '1', x: 0, y: 0, width: 2, height: 2 },
      //   { id: '2', x: 2, y: 3, width: 1, height: 1 },
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
    this.eventHandler()
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
        float: true,
        disableOneColumnMode: true,
        dragIn: '.sidebar-item-menu .fd-dnd-comp-item',
        dragInOptions: {
          scroll: false,
          appendTo: 'body',
          helper: event => {
            this.isDraging = true
            return event.currentTarget.cloneNode(true)
          },
          revert: () => {
            this.isDraging = false
            return true
          }
        },
        acceptWidgets: () => {
          return true
        }
      })
      this.grid.column(16)
    },
    eventHandler() {
      this.gridAddEvent()
      this.gridChangeEvent()
    },
    gridAddEvent() {
      this.grid.on('added', (event, items) => {
        if (this.addLocked) return
        this.addLocked = true
        items.forEach(widget => {
          console.log(widget)
          const componentName = widget.el.getAttribute('data-name')
          const componentType = widget.el.getAttribute('data-type')
          const { x, y, width, height } = widget
          const item = find(this.defaults[componentType], {
            name: componentName
          })
          // const width = item.layout.defaultWidth / 50
          // const height = item.layout.defaultHeight / 50
          this.grid.removeWidget(widget.el)
          if (this.grid.willItFit(x, y, width, height, true)) {
            const id = this.createCompId()
            console.log({ x, y, width, height, id })
            const component = Utils.deepClone(
              Object.assign({}, item, { x, y, width, height, id })
            )
            console.log(this.list)
            this.list.push(component)
            this.updateSelectComponent(component)
            this.$nextTick(() => {
              this.grid.makeWidget(id)
              this.addLocked = false
            })
          } else {
            alert('Not enough free space to place the widget')
          }
        })
        // this.setGridMinHeight()
      })
    },
    gridChangeEvent() {
      this.grid.on('change', () => {
        this.setGridMinHeight()
      })
    },
    onSelect(item) {
      this.updateSelectComponent(item)
    },
    setGridMinHeight() {
      const currentRow = this.grid.el.getAttribute('data-gs-current-row') || 0
      const cellHeight = this.grid.getCellHeight() || 0
      this.gridMinHeight = (+currentRow + 1) * +cellHeight + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-design-pane {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ::v-deep .el-form {
    height: 100%;
  }
}
.fd-dnd-area {
  width: 800px;
  margin: 0 auto;
  min-height: 100%;
}
.fd-dnd-placeholder {
  .fd-dnd-area {
    &::after {
      content: '从左侧拖拽来添加数据项';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      color: #999;
      white-space: nowrap;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.grid-stack-item {
  .grid-stack-item-content {
    background-color: #fff;
    cursor: move;
  }
  &.is-active {
    .grid-stack-item-content {
      border: 1px dashed $--color-primary;
    }
  }
}

@mixin grid-stack-items($columns) {
  .grid-stack.grid-stack-#{$columns} {
    > .grid-stack-item {
      min-width: 100% / $columns;

      @for $i from 1 through $columns {
        &[data-gs-width='#{$i}'] {
          width: (100% / $columns) * $i;
        }
        &[data-gs-x='#{$i}'] {
          left: (100% / $columns) * $i;
        }
        &[data-gs-min-width='#{$i}'] {
          min-width: (100% / $columns) * $i;
        }
        &[data-gs-max-width='#{$i}'] {
          max-width: (100% / $columns) * $i;
        }
      }
    }
  }
}

@include grid-stack-items(16);
</style>
