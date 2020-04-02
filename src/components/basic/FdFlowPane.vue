<template>
  <div class="fd-design-pane" ref="fdDesignPane">
    <div
      v-show="dragareaVisible"
      class="fd-layout-dragarea"
      @dragover="dragover"
      @drop="drop"
    ></div>
    <div class="fd-dnd-placeholder" v-if="nodeList.length === 0">
      从左侧拖拽来添加数据项
    </div>
    <div class="fd-dnd-edit" id="flowchart"></div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
// import { findIndex } from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
import Utils from '@/helper/utils'
import bus from '@/helper/bus'
export default {
  name: 'FdFlowPane',
  computed: {
    ...mapGetters(['toc', 'selectIndex', 'isShowPage', 'isFormPage'])
  },
  data() {
    return {
      selectedFieldId: 0,
      isRendered: false,
      rerender: Date.now(),
      currNode: null,
      dragareaVisible: false,
      graph: null,
      nodeList: [
        {
          id: Utils.guid(),
          x: 300,
          y: 100,
          label: '开始',
          nodeType: 'start'
        },
        {
          id: Utils.guid(),
          x: 300,
          y: 500,
          label: '结束',
          nodeType: 'end'
        }
      ],
      edgeList: []
    }
  },
  mounted() {
    const {
      offsetWidth: graphWidth,
      offsetHeight: graphHeight
    } = this.$refs.fdDesignPane
    this.graph = new G6.Graph({
      container: 'flowchart',
      modes: {
        default: ['drag-node', 'click-select']
      },
      width: graphWidth,
      height: graphHeight,
      defaultNode: {
        type: 'rect',
        size: [120, 40],
        // ...                 // 节点的其他配置
        // 节点样式配置
        style: {
          fill: '#fff', // 节点填充色
          stroke: '#37abfd', // 节点描边色
          lineWidth: 1 // 节点描边粗细
        },
        // 节点上的标签文本配置
        labelCfg: {
          // 节点上的标签文本样式配置
          style: {
            fill: '#000' // 节点标签文字颜色
          }
        }
      }
    })
    this.graph.on('node:click', ev => {
      const shape = ev.target
      const node = ev.item
      console.log(shape)
      console.log(node)
    })
    this.graph.data({
      nodes: this.nodeList,
      edges: this.edgeList
    })
    this.graph.render()
    this.graph.setMode('default')
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
    dragstart(node) {
      this.dragareaVisible = true
      this.currNode = node
    },
    dragend() {
      this.dragareaVisible = false
      this.currNode = null
    },
    dragover(event) {
      event.preventDefault()
    },
    drop(event) {
      console.log(this.currNode)
      console.log(event)
      this.nodeList.push(
        Object.assign({}, this.currNode, {
          x: event.offsetX,
          y: event.offsetY
        })
      )
      this.graph.render()
      // let selectIndex = findIndex(this.list, { id: this.currNode.i })
      // if (selectIndex !== -1) {
      //   this.updateSelectIndex(selectIndex)
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-layout {
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
}
.fd-grid {
  &-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
