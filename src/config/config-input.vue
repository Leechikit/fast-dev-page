<template>
  <div>
    <el-input v-model.trim="currentValue" clearable />
  </div>
</template>
<script>
export default {
  name: 'ConfigInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>
