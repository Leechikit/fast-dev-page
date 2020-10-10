<template>
  <div class="sidebar-item-menu">
    <div v-for="(item, $index) in type" :key="$index">
      <div class="sidebar-item-menu-head">
        {{ getCaption(item) }}
      </div>
      <div class="sidebar-item-menu-body">
        <div class="fd-dnd-comp-list">
          <div
            class="fd-dnd-comp-item"
            v-for="(comp, idx) in defaults[item]"
            :key="idx"
            :data-type="item"
            :data-name="comp.name"
          >
            <span class="grid-stack-item-content"
              ><fd-icon :name="comp.icon" />{{ comp.label }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/helper/bus'
import { mapState } from 'vuex'
import Utils from '@/helper/utils'
import FdIcon from '@/components/basic/FdIcon'

const CAPTION_MAP = {
  FORM: '表单组件',
  SHOW: '数据组件',
  TEXT: '文本组件',
  PAGE: '页面组件',
  LAYOUT: '布局组件'
}
export default {
  name: 'FdComponentPane',
  props: {
    type: {
      type: Array,
      default: () => ['PAGE', 'LAYOUT']
    }
  },
  components: {
    FdIcon
  },
  computed: {
    ...mapState(['defaults'])
  },
  methods: {
    onAddComp(row) {
      let comp = Utils.deepClone({
        ...row
      })
      bus.$emit('dragstart', comp)
      return comp
    },
    dragend() {
      bus.$emit('dragend')
    },
    getCaption(type) {
      return CAPTION_MAP[type]
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
    height: 28px;
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
  &.ui-draggable-dragging {
    width: 115px;
    & > span {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
