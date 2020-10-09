<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-03-30 15:01:40
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-09 10:43:30
-->
<template>
  <div>
    <component :is="type" v-model="currentValue" :config="config"></component>
  </div>
</template>

<script>
let configs = require.context('./', true, /config-.*\.vue$/)
let components = {}
configs.keys().forEach(key => {
  let control = configs(key)
  components[control.default.name] = control.default
})

export default {
  props: ['type', 'value', 'config'],
  components: {
    ...components
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: {
      handler() {
        this.currentValue = this.value
      },
      deep: true
    },
    currentValue() {
      this.$emit('input', this.currentValue)
    }
  }
}
</script>
