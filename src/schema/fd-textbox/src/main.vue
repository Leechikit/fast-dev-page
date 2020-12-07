<!--
 * @Description: 单行文本组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-12 10:28:21
-->
<template>
  <div class="textbox">
    <template v-if="labelVisible">
      <el-form-item :label="label" :required="required">
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
    },
    required: Boolean
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
