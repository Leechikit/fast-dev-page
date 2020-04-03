<template>
  <div class="sidebar-item-menu">
    <div class="sidebar-item-menu-head">流程节点</div>
    <div class="sidebar-item-menu-body">
      <draggable
        :sort="false"
        :clone="onAddNode"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="nodeList"
        class="fd-dnd-node-list"
        @end="dragend"
      >
        <div
          class="fd-dnd-node-item"
          :data-key="idx"
          v-for="(node, idx) in nodeList"
          :key="idx"
        >
          <span><fd-icon :name="node.icon" />{{ node.label }}</span>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import bus from '@/helper/bus'
import Utils from '@/helper/utils'
import FdIcon from '@/components/basic/FdIcon'

export default {
  name: 'FdNodePane',
  components: {
    draggable,
    FdIcon
  },
  data() {
    return {
      nodeList: [
        {
          nodeType: 'circulate',
          label: '抄送节点',
          icon: ''
        },
        {
          nodeType: 'approve',
          label: '审批节点',
          icon: ''
        }
      ]
    }
  },
  methods: {
    onAddNode(row) {
      let node = Utils.deepClone({
        ...row,
        ...{ id: Utils.guid() }
      })
      bus.$emit('dragstart', node)
      return node
    },
    dragend() {
      bus.$emit('dragend')
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  &-item {
    &-menu {
      &-head {
        padding: 0 10px;
        font-size: 14px;
      }
    }
  }
}
.fd-dnd-node-list {
  overflow: hidden;
  padding: 10px;
}
.fd-dnd-node-item {
  font-size: 12px;
  width: 50%;
  line-height: 28px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
  > span {
    display: flex;
    align-items: center;
    color: #333;
    background: #f4f6f6;
    border: 1px solid #f4f6f6;
    &:hover {
      cursor: move;
      color: $--color-primary;
      border: 1px dashed $--color-primary;
    }
  }
  .fd-icon {
    margin: 0 4px 0 8px;
  }
}
</style>
