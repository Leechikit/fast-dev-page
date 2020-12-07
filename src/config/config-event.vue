<template>
  <div>
    <ul>
      <li
        class="config-event-item"
        v-for="(func, funcName) in currentValue"
        :key="funcName"
      >
        <span class="config-event-name" v-text="funcName"></span>
        <el-button-group class="config-event-buttons">
          <el-button
            size="mini"
            icon="el-icon-edit-outline"
            @click.stop="onEdit(funcName)"
          />
          <el-button
            size="mini"
            icon="el-icon-delete"
            @click.stop="onDelete(funcName)"
          />
        </el-button-group>
      </li>
    </ul>
    <div class="config-event-add">
      <el-button sise="mini" @click="onAdd">新增事件</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="事件名">
          <el-input v-model="event.name"></el-input>
        </el-form-item>
        <el-form-item label="事件函数">
          <el-input v-model="event.func"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import base from './mixins/base'
export default {
  name: 'ConfigEvent',
  mixins: [base],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      event: {
        name: '',
        func: ''
      }
    }
  },
  methods: {
    onEdit(funcName) {
      this.event.name = funcName
      this.event.func = this.currentValue[funcName] + ''
      this.dialogVisible = true
    },
    onCancel() {
      this.event.name = ''
      this.event.func = ''
      this.dialogVisible = false
    },
    onDelete(funcName) {
      this.event.name = ''
      this.event.func = ''
      this.$delete(this.currentValue, funcName)
    },
    onSubmit() {
      if (!this.event.name) return
      this.currentValue[this.event.name] = this.event.func
      this.dialogVisible = false
    },
    onAdd() {
      this.event.name = ''
      this.event.func = ''
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
.config-event {
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
    // border-width: 1px 0 1px 1px;
    // border-style: solid;
    // border-color: $--color-primary;
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
}
</style>
