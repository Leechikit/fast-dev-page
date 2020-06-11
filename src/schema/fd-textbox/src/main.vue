<!--
 * @Description: 单行文本组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-11 18:39:52
-->
<template>
  <div class="textbox">
    <el-form-item :label="label">
      <el-input v-model="value"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'FdTextbox',
  props: {
    label: {
      type: String,
      default: ''
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
