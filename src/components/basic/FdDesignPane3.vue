<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-18 16:17:13
-->
<template>
  <div
    class="fd-design-pane"
    :class="{
      'fd-dnd-placeholder': !isDraging && list.length === 0
    }"
    ref="container"
  >
    <el-form>
      <div class="grid-stack fd-dnd-area" :style="{ minHeight: gridMinHeight }">
        <div
          class="grid-stack-item"
          :class="{
            'is-active': selectId === item.id
          }"
          v-for="(item, idx) in list"
          :key="idx"
          :id="item.id"
          :data-gs-id="item.id"
          :data-gs-x="item.x"
          :data-gs-y="item.y"
          :data-gs-width="item.width"
          :data-gs-height="item.height"
          @click.stop="onSelect(item)"
        >
          <div class="grid-stack-item-content ui-draggable-handle">
            <fd-component :key="rerender" :data="item" />
          </div>
          <div
            class="fd-dnd-buttons"
            :style="{ right: gridMargin, bottom: gridMargin }"
          >
            <div
              v-show="expandButtons"
              class="fd-dnd-buttons-item"
              @click.stop="onCopy(idx, item)"
            >
              <fd-icon name="copy" />
            </div>
            <div
              v-show="expandButtons"
              class="fd-dnd-buttons-item"
              @click.stop="onDelete(idx, item)"
            >
              <fd-icon name="delete" />
            </div>
            <div class="fd-dnd-buttons-item">
              <fd-icon name="scale" />
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <!-- <div class="fd-dnd-background"></div> -->
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
      gridMinHeight: '100%',
      gridMargin: '1px',
      addLocked: false,
      isDraging: false,
      list: [],
      rerender: Date.now(),
      expandButtons: true
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
        margin: this.gridMargin,
        animate: true,
        alwaysShowResizeHandle: true,
        cellHeight: '20px',
        disableOneColumnMode: true,
        acceptWidgets: () => true,
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
          if (widget.el.className.includes('grid-stack-item')) return
          const componentName = widget.el.getAttribute('data-name')
          const componentType = widget.el.getAttribute('data-type')
          const { x, y } = widget
          const item = find(this.defaults[componentType], {
            name: componentName
          })
          const width = Math.ceil(item.layout.defaultWidth / 50)
          const height = Math.ceil(item.layout.defaultHeight / 20)
          this.grid.removeWidget(widget.el)
          if (this.grid.willItFit(x, y, width, height, true)) {
            const id = this.createCompId()
            const component = Utils.deepClone(
              Object.assign({}, item, { x, y, width, height, id })
            )
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
        this.setGridMinHeight()
      })
    },
    gridChangeEvent() {
      this.grid.on('change', (event, items) => {
        items.forEach(widget => {
          const { width, height, x, y } = widget
          let component = find(this.list, { id: widget.id })
          component.width = width
          component.height = height
          component.x = x
          component.y = y
          this.expandButtons = width > 1
        })
        this.setGridMinHeight()
      })
    },
    onSelect(item) {
      this.updateSelectComponent(item)
    },
    onDelete(index) {
      this.list.splice(index, 1)
      if (this.list.length > 0 && index >= this.list.length) {
        this.updateSelectComponent(this.list[this.list.length - 1])
      }
    },
    onCopy(index, item) {
      const id = this.createCompId()
      let { height, x, y } = item
      let clone = Utils.deepClone(
        Object.assign({}, item, { id, y: y + height })
      )
      // this.list.splice(index + 1, 0, clone)
      this.list.push(clone)
      this.updateSelectComponent(clone)
      this.$nextTick(() => {
        this.grid.makeWidget(id)
        this.grid.move(id, x, y + height)
      })
    },
    setGridMinHeight() {
      this.$nextTick(() => {
        const currentRow = this.grid.el.getAttribute('data-gs-current-row') || 0
        const cellHeight = this.grid.getCellHeight() || 0
        const containerHeight = this.$refs.container.clientHeight
        const thresholdHeight = 100
        const calculateHeight =
          +currentRow * +cellHeight + Math.max(thresholdHeight, cellHeight)
        this.gridMinHeight =
          calculateHeight > containerHeight - 100
            ? `${calculateHeight}px`
            : `${containerHeight}px`
      })
    },
    formatList(arrs) {
      return arrs.map(item => {
        console.log(item)
      })
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
    // position: relative;
    // z-index: 1;
    height: 100%;
  }
}
.fd-dnd-area {
  width: 800px;
  margin: 0 auto;
}
.fd-dnd-placeholder {
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
.fd-dnd-background {
  position: absolute;
  left: 50%;
  top: 0;
  width: 800px;
  height: 100%;
  background-color: rgba(#dcdfe6, 0.5);
  background-image: -webkit-linear-gradient(top, transparent 18px, #fff 20px),
    -webkit-linear-gradient(left, transparent 48px, #fff 50px);
  background-size: 50px 20px;
  transform: translateX(-50%);
}
.grid-stack-item {
  &.is-active {
    .grid-stack-item-content {
      border: 1px dashed $--color-primary;
    }
  }
  .grid-stack-item-content {
    background-color: #fff;
    overflow-y: hidden;
    cursor: move;
  }
  ::v-deep .ui-resizable-handle {
    width: 30px;
    height: 24px;
    right: 0 !important;
    bottom: 0 !important;
    background-image: none;
    transform: none;
    &:hover {
      background-color: rgba(#fff, 0.2);
    }
  }
}
.fd-dnd-buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 11;
  &-item {
    font-size: 12px;
    color: #fff;
    background-color: $--color-primary;
    width: 30px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    &:not(:last-child) {
      border-right: 1px solid rgba(#fff, 0.5);
    }
    &:hover {
      background-color: rgba($--color-primary, 0.8);
    }
  }
}
</style>
<style lang="scss">
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
