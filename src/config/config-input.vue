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
    value() {
      if (this.value !== this.currentValue) {
        this.currentValue = this.value
      }
    },
    currentValue() {
      this.$emit('input', this.currentValue)
    }
  }
}
</script>
