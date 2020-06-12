<!--
 * @Description: 单行输入框
 * @Autor: Lizijie
 * @Date: 2020-06-12 10:22:35
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-12 10:59:50
-->
<template>
  <div>
    <el-input v-model.trim="currentValue" clearable />
  </div>
</template>
<script>
import base from './mixins/base'
export default {
  name: 'ConfigInput',
  mixins: [base],
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
