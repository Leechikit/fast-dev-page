<template>
  <div>
    <ul>
      <li
        class="config-event-item"
        v-for="(func, funcName) in currentValue.on"
        :key="funcName"
      >
        <span class="config-event-name" v-text="funcName"></span>
        <el-button-group class="config-event-buttons">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit-outline"
            @click.stop="onEdit(funcName)"
          />
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click.stop="onDelete(funcName)"
          />
        </el-button-group>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ConfigEvent',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value() {
      if (this.value !== this.currentValue) {
        this.currentValue = this.value
      }
    },
    currentValue() {
      this.$emit('input', this.currentValue)
    }
  },
  created() {
    console.log(this.value)
  },
  methods: {
    onEdit() {},
    onDelete(funcName) {
      this.$delete(this.currentValue.on, funcName)
    }
  }
}
</script>
<style lang="scss">
.config-event {
  &-item {
    display: flex;
    justify-content: space-between;
  }
  &-name {
    display: block;
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 10px;
    border-width: 1px 0 1px 1px;
    border-style: solid;
    border-color: $--color-primary;
    font-size: 14px;
    color: #606266;
    height: 28px;
  }
  &-buttons {
    flex-shrink: 0;
    margin-left: -2px;
  }
}
</style>
