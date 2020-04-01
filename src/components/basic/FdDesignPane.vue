<template>
  <div class="fd-design-pane">
    <!-- <fd-axis-pane v-if="isShowPage" /> -->
    <div class="layoutBox">
      <div
        v-show="dragareaVisible"
        class="layoutBox-dragarea"
        @dragenter="dragenter"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      ></div>
      <div class="layoutBox-edit">
        <grid-layout
          ref="gridLayout"
          :layout.sync="list"
          :col-num="1000 / colWidth"
          :row-height="colHeight"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :margin="[0, 0]"
          :autoSize="true"
          :use-css-transforms="true"
        >
          <grid-item
            v-for="item in list"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
          >
            <fd-component :key="rerender" :data="item.schema" />
            <!-- <div class="layoutBox-item" :class="{ 's-selected': item.focus }">
              {{ item.cnName }}
            </div> -->
          </grid-item>
        </grid-layout>
      </div>
      <div class="layoutBox-background"></div>
    </div>
    <!-- <draggable
      v-if="isRendered"
      :animation="200"
      :list="list"
      :class="{
        'is-show-page': isShowPage
      }"
      ghost-class="fd-ghost"
      class="fd-dnd-area"
      @add="onAdd"
      @end="onMoveEnd"
      @start="onMoveStart"
      group="form"
    >
      <div class="fd-dnd-placeholder" v-if="list.length === 0">
        从左侧拖拽来添加数据项
      </div>
      <template v-else>
        <div
          :class="{
            'fd-dnd-form-item': true,
            'is-active': selectIndex === index
          }"
          :key="item.id"
          v-for="(item, index) in list"
          @click="onSelect(index, item)"
        >
          <fd-component :key="rerender" :data="item" />
          <div class="fd-dnd-overlay"></div>
          <el-button-group class="fd-dnd-buttons" v-if="selectIndex === index">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-document-copy"
              @click.stop="onCopy(index, item)"
            />
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-delete"
              @click.stop="onDelete(index)"
            />
          </el-button-group>
        </div>
      </template>
    </draggable> -->
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
import VueGridLayout from 'vue-grid-layout'
import { findIndex } from 'lodash'
// import FdTocPage from './FdTocPage'
import { mapGetters, mapMutations } from 'vuex'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
import bus from '@/helper/bus'
// import FdAxisPane from './FdAxisPane'
export default {
  name: 'FdDesignPane',
  components: {
    // FdAxisPane,
    // FdTocPage,
    FdComponent,
    // draggable,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  computed: {
    ...mapGetters(['toc', 'selectIndex', 'isShowPage', 'isFormPage'])
  },
  data() {
    return {
      list: [],
      selectedFieldId: 0,
      isRendered: false,
      rerender: Date.now(),
      colWidth: 125,
      colHeight: 50,
      currentPlugin: null,
      dragareaVisible: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.list = this.toc.children
      this.isRendered = true
    })
    bus.$on('dragstart', this.dragstart)
    bus.$on('dragend', this.dragend)
  },
  methods: {
    ...mapMutations([
      'updateSelectIndex',
      'addComponent',
      'delComponent',
      'updateRenderList'
    ]),
    onAdd(row) {
      this.updateSelectIndex(row.newIndex)
      this.updateRenderList(this.list)
    },
    onMoveEnd(row) {
      this.updateSelectIndex(row.newIndex)
      this.updateRenderList(this.list)
    },
    onMoveStart(row) {
      this.updateSelectIndex(row.oldIndex)
    },
    onSelect(index) {
      this.updateSelectIndex(index)
    },
    onDelete(index) {
      this.delComponent(index)
      if (index >= this.list.length) {
        this.updateSelectIndex(this.list.length - 1)
      }
    },
    onCopy(index, row) {
      this.updateSelectIndex(index + 1)
      this.addComponent(
        Utils.deepClone(Object.assign({}, row, { id: Utils.guid() }))
      )
    },
    dragstart(plugin) {
      this.dragareaVisible = true
      this.currentPlugin = this.formatPlugin(plugin)
    },
    dragend() {
      this.dragareaVisible = false
      this.currentPlugin = null
    },
    dragenter() {
      if (findIndex(this.list, { i: this.currentPlugin.i }) === -1) {
        this.list.push(this.currentPlugin)
        this.updateSelectIndex(this.list.length - 1)
        this.updateRenderList(this.list)
        // this.addSelectedPlugins(this.currentPlugin)
        this.$refs.gridLayout.dragEvent(
          'dragstart',
          this.currentPlugin.i,
          Math.floor(event.offsetX / this.colWidth),
          Math.floor(event.offsetY / this.colHeight),
          this.currentPlugin.h,
          this.currentPlugin.w
        )
      }
    },
    dragover(event) {
      event.preventDefault()
      // this.$refs.gridLayout.dragEvent(
      //   'dragmove',
      //   this.currentPlugin.i,
      //   Math.floor(event.offsetX / this.colWidth),
      //   Math.floor(event.offsetY / this.colHeight),
      //   this.currentPlugin.h,
      //   this.currentPlugin.w
      // )
    },
    dragleave() {
      // this.removeSelectedPlugin(this.currentPlugin.i)
    },
    drop() {
      // this.$refs.gridLayout.dragEvent(
      //   'dragend',
      //   this.currentPlugin.i,
      //   Math.floor(event.offsetX / this.colWidth),
      //   Math.floor(event.offsetY / this.colHeight),
      //   this.currentPlugin.h,
      //   this.currentPlugin.w
      // )
      // this.$refs.gridLayout.layoutUpdate()
      // this.focusSelectedPlugin(this.currentPlugin.i)
    },
    formatPlugin(plugin) {
      console.log(plugin)
      const {
        label,
        name,
        layout,
        x = 0,
        y = 0,
        i = plugin.id,
        focus = false
      } = plugin
      return {
        cnName: label,
        enName: name,
        w: Math.ceil(+layout.defaultWidth / this.colWidth),
        h: Math.ceil(+layout.defaultHeight / this.colHeight),
        x: Math.floor(+x / this.colWidth),
        y: Math.floor(+y / this.colHeight),
        i,
        focus,
        schema: plugin
      }
    }
  },
  watch: {
    toc: {
      handler(newVal) {
        if (newVal) {
          this.list = newVal.children
          // this.rerender = Date.now()
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.layoutBox {
  position: relative;
  width: 100%;
  overflow-x: auto;
  &-dragarea {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &-edit {
    position: relative;
    z-index: 1;
    width: 1000px;
    min-height: 600px;
  }
  &-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 1000px;
    height: 100%;
    background-color: rgba(#dcdfe6, 0.5);
    background-image: -webkit-linear-gradient(top, transparent 48px, #fff 50px),
      -webkit-linear-gradient(left, transparent 123px, #fff 125px);
    background-size: 125px 50px;
  }
  &-item {
    width: 100%;
    height: 100%;
    &.s-selected {
      border: 1px solid yellow;
    }
  }
}
.fd-design-pane {
  height: calc(100vh - 54px);
  overflow-y: auto;
}
.fd-dnd-area {
  position: relative;
  min-height: 100%;
}
.fd-dnd-placeholder {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: white;
  color: #999;
  white-space: nowrap;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fd-dnd-form-item {
  background-color: #fff;
  cursor: move;
  position: relative;
  z-index: 10;
  // padding: 12px 20px 10px;
  display: table;
  width: 100%;
  border-left: 5px solid transparent;
  // border-right: 5px solid transparent;
  ::v-deep {
    .el-form-item__label {
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .fd-dnd-overlay {
    content: '';
    display: block;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: 11;
    &:hover {
      margin: 0 -5px;
      background-color: rgba(64, 158, 255, 0.05);
    }
  }
  &.is-active {
    z-index: 10;
    border-left: 5px solid $--color-primary;
    background-color: #edf5ff;
  }
}
.fd-dnd-buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 11;
  .el-button {
    border-radius: 0;
  }
}
</style>
<style lang="scss">
.fd-ghost {
  position: absolute;
  z-index: 1010;
  width: 100% !important;
  border: 1px dashed $--color-primary;
  height: 32px;
  padding: 0;
  > span {
    border: 0 !important;
    background: none !important;
    font-size: 0;
    .fd-icon {
      width: 0;
      height: 0;
      display: none;
    }
  }
}
</style>
