<!--
 * @Description: 图片组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-10 11:34:37
-->
<template>
  <div class="image">
    <img v-if="url" :src="url" :alt="name" @click="onClick" />
    <span v-else>暂无图片</span>
  </div>
</template>
<script>
export default {
  name: 'FdImage',
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  // created() {
  //   console.log(this.$listeners)
  // },
  methods: {
    onClick(event) {
      this.$emit('test', event)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
