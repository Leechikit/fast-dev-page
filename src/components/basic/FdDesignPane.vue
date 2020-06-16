<template>
  <div
    class="fd-design-pane"
    :class="{
      'g-horizontal': direction === 'horizontal',
      'g-vertical': direction === 'vertical'
    }"
  >
    <el-form>
      <!-- <fd-axis-pane v-if="isShowPage" /> -->
      <draggable
        v-if="isRendered"
        :animation="200"
        :list="list"
        ghost-class="fd-ghost"
        class="fd-dnd-area"
        :class="{
          'fd-dnd-placeholder':
            !isDraging && (list.length === 0 || direction === 'horizontal'),
          'g-horizontal': direction === 'horizontal',
          'g-vertical': direction === 'vertical'
        }"
        :style="{
          width:
            direction === 'horizontal' && list.length > 0
              ? `${(list.length + 1) * 200}px`
              : 'auto'
        }"
        @add="onAdd"
        @end="onMoveEnd"
        @start="onMoveStart"
        group="form"
      >
        <div
          :class="{
            'fd-dnd-form-item': true,
            'is-active': selectId === item.id
          }"
          :key="item.id"
          v-for="(item, index) in list"
          @click.stop="onSelect(item)"
        >
          <fd-component :key="rerender" :data="item" />
          <!-- <div v-show="!draging" class="fd-dnd-overlay"></div> -->
          <el-button-group
            class="fd-dnd-buttons"
            v-if="!isDraging && selectId === item.id"
          >
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
              @click.stop="onDelete(index, item)"
            />
          </el-button-group>
        </div>
      </draggable>
    </el-form>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapState, mapMutations, mapGetters } from 'vuex'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
import bus from '@/helper/bus'
export default {
  name: 'FdDesignPane',
  components: {
    FdComponent,
    draggable
  },
  props: {
    plist: {
      type: Array
    },
    direction: {
      type: String,
      default: 'vertical' // horizontal
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['selectId'])
  },
  data() {
    return {
      list: [],
      isRendered: false,
      rerender: Date.now(),
      isDraging: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.list = this.plist
      this.isRendered = true
    })
    bus.$on('dragstart', () => {
      this.isDraging = true
    })
    bus.$on('dragend', () => {
      this.isDraging = false
    })
  },
  methods: {
    ...mapMutations(['updateSelectComponent', 'incrementCount']),
    createCompId() {
      this.incrementCount()
      const BASE = '0000000'
      return `F${BASE.slice((this.count + '').length)}${this.count}`
    },
    onAdd(row) {
      const index =
        row.newIndex < this.list.length ? row.newIndex : this.list.length - 1
      const item = this.list[index]
      if (!item.id) {
        item.id = this.createCompId()
      }
      this.$nextTick(() => {
        this.updateSelectComponent(item)
      })
    },
    onMoveEnd(row) {
      const item = this.list[row.newIndex]
      console.log(this.list)
      this.updateSelectComponent(item)
      bus.$emit('dragend')
    },
    onMoveStart(row) {
      const item = this.list[row.oldIndex]
      this.updateSelectComponent(item)
      bus.$emit('dragstart')
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
      const clone = Utils.deepClone(
        Object.assign({}, item, { id: this.createCompId() })
      )
      this.updateSelectComponent(clone)
      this.list.splice(index + 1, 0, clone)
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
  }
}
</script>
<style lang="scss" scoped>
.fd-design-pane {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &.g-horizontal {
    overflow-x: auto;
    overflow-y: hidden;
    .fd-dnd-area {
      position: relative;
      display: flex;
      height: 100px;
      background-color: #fff;
    }
    .fd-dnd-area {
      overflow: hidden;
    }
    .fd-dnd-form-item {
      max-width: 200px;
      max-height: 100px;
    }
    ::v-deep .fd-ghost {
      max-width: 200px;
      max-height: 100px;
    }
  }
}
.fd-dnd-area {
  position: relative;
  min-height: 100%;
}
.fd-dnd-placeholder {
  &::after {
    content: '从左侧拖拽来添加数据项';
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
  &.g-vertical {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
.fd-dnd-form-item {
  background-color: #fff;
  cursor: move;
  position: relative;
  z-index: 10;
  width: 100%;
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
    border: 1px dashed $--color-primary;
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
::v-deep .fd-ghost {
  display: block !important;
  float: none !important;
  width: 100% !important;
  border: 1px dashed $--color-primary;
  min-height: 32px;
  padding: 0;
  overflow: hidden;
  position: static !important;
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
::v-deep .el-form {
  height: 100%;
}
::v-deep .el-input__inner {
  pointer-events: none;
}
</style>
