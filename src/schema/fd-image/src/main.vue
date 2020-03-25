<template>
  <div class="image" v-if="url">
    <img :src="url" :alt="name" />
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
  }
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
