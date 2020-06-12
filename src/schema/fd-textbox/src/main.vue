<!--
 * @Description: 单行文本组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-12 11:06:01
-->
<template>
  <div class="textbox">
    <template v-if="labelVisible">
      <el-form-item :label="label">
        <el-input v-model="value"></el-input>
      </el-form-item>
    </template>
    <template v-else>
      <el-input v-model="value"></el-input>
    </template>
  </div>
</template>
<script>
export default {
  name: 'FdTextbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>
