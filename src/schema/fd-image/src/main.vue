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
  created() {
    console.log(this.$listeners)
  },
  methods: {
    onClick(event) {
      if (this.$listeners.test) {
        this.$emit('test', event)
      } else {
        console.log('没有绑定')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
