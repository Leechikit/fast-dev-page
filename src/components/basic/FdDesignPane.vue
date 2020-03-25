<template>
  <div class="fd-design-pane">
    <!-- <fd-axis-pane v-if="isShowPage" /> -->
    <draggable
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
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
// import FdTocPage from './FdTocPage'
import { mapGetters, mapMutations } from 'vuex'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
// import FdAxisPane from './FdAxisPane'
export default {
  name: 'FdDesignPane',
  components: {
    // FdAxisPane,
    // FdTocPage,
    FdComponent,
    draggable
  },
  computed: {
    ...mapGetters(['toc', 'selectIndex', 'isShowPage', 'isFormPage'])
  },
  data() {
    return {
      list: [],
      selectedFieldId: 0,
      isRendered: false,
      rerender: Date.now()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.list = this.toc.children
      this.isRendered = true
    })
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
    }
  },
  watch: {
    toc: {
      handler(newVal) {
        if (newVal) {
          this.list = newVal.children
          this.rerender = Date.now()
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-design-pane {
  height: calc(100vh - 54px);
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
  padding: 12px 20px 10px;
  display: table;
  width: 100%;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
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
  right: -1px;
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
