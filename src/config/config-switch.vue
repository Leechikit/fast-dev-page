<!--
 * @Description: 是否开关配置
 * @Autor: Lizijie
 * @Date: 2020-06-12 10:37:34
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-12 11:03:14
-->
<template>
  <div>
    <el-switch v-model="currentValue"> </el-switch>
  </div>
</template>
<script>
import base from './mixins/base'
export default {
  name: 'ConfigSwitch',
  mixins: [base],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
