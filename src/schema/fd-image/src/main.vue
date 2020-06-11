<!--
 * @Description: 图片组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-10 18:04:55
-->
<template>
  <div class="image" v-if="url">
    <img :src="url" :alt="name" @click="onClick" />
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
