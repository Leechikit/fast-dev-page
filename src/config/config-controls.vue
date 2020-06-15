<!--
 * @Description: 表单控件选择
 * @Autor: Lizijie
 * @Date: 2020-06-12 17:08:47
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-12 17:50:44
-->
<template>
  <div class="controls">
    <draggable :animation="200" :list="currentValue">
      <div
        class="controls-item"
        v-for="(item, $index) in currentValue"
        :key="$index"
      >
        <span class="controls-name" v-text="item.configs.label.value"></span>
        <el-button-group class="controls-buttons">
          <el-button
            size="mini"
            icon="el-icon-delete"
            @click.stop="onDelete($index)"
          />
        </el-button-group>
      </div>
    </draggable>
    <div class="controls-add">
      <el-popover placement="left" trigger="hover" width="250">
        <div
          v-for="(item, $index) in formComp"
          :key="$index"
          class="control"
          @click="onAdd(item)"
        >
          {{ item.label }}
        </div>
        <el-button slot="reference" sise="mini">新增组件</el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import base from './mixins/base'
import { mapState } from 'vuex'
import Utils from '@/helper/utils'
export default {
  name: 'ConfigControls',
  mixins: [base],
  components: {
    draggable
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['defaults']),
    formComp() {
      return this.defaults['FORM']
    }
  },
  methods: {
    onDelete(index) {
      this.currentValue.splice(index, 1)
    },
    onAdd(item) {
      this.currentValue.push(Utils.deepClone(item))
    }
  }
}
</script>
<style lang="scss" scoped>
.controls {
  &-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $--color-line;
    &:last-child {
      border: none;
    }
  }
  &-name {
    display: block;
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 10px;
    font-size: 14px;
    color: #606266;
    height: 28px;
  }
  &-buttons {
    flex-shrink: 0;
    margin-left: -2px;
    .el-button {
      border: none;
    }
  }
  &-add {
    margin-top: 5px;
    .el-button {
      width: 100%;
    }
  }
  .control {
    &:not(:last-child) {
      border-bottom: 1px solid $--color-line;
      cursor: pointer;
    }
  }
}
</style>
