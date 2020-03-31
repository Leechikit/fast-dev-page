<template>
  <svg class="fd-icon" :width="width" :height="height">
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
    },
    width: {
      type: String,
      default: '16px'
    },
    height: {
      type: String,
      default: '16px'
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
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
}
</style>
