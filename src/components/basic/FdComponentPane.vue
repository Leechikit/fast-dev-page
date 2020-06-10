<template>
  <div class="sidebar-item-menu">
    <div class="sidebar-item-menu-head">{{ caption }}</div>
    <div class="sidebar-item-menu-body">
      <draggable
        :sort="false"
        :clone="onAddComp"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="defaults[type]"
        class="fd-dnd-comp-list"
        @end="dragend"
      >
        <div
          class="fd-dnd-comp-item"
          :data-key="idx"
          v-for="(comp, idx) in defaults[type]"
          :key="idx"
        >
          <span><fd-icon :name="comp.icon" />{{ comp.label }}</span>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import bus from '@/helper/bus'
import { mapGetters } from 'vuex'
import Utils from '@/helper/utils'
import FdIcon from '@/components/basic/FdIcon'

const CAPTION_MAP = {
  FORM: '基础组件',
  SHOW: '数据组件',
  TEXT: '文本组件',
  PAGE: '页面组件',
  LAYOUT: '布局组件'
}
export default {
  name: 'FdComponentPane',
  props: {
    type: {
      type: String,
      default: 'PAGE'
    }
  },
  components: {
    draggable,
    FdIcon
  },
  computed: {
    ...mapGetters(['defaults']),
    caption() {
      return CAPTION_MAP[this.type]
    }
  },
  methods: {
    onAddComp(row) {
      let comp = Utils.deepClone({
        ...row,
        ...{ id: Utils.guid() }
      })
      bus.$emit('dragstart', comp)
      return comp
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
.fd-dnd-comp-list {
  overflow: hidden;
  padding: 10px;
}
.fd-dnd-comp-item {
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
