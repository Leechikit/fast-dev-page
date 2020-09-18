<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-03-31 14:42:03
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-18 10:56:53
-->
<template>
  <svg class="fd-icon">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: 'FdIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#${this.name}`
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}
</style>
