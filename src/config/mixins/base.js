/*
 * @Description: 配置项公共
 * @Autor: Lizijie
 * @Date: 2020-06-12 10:50:24
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-12 10:55:41
 */
export default {
  props: {
    value: {}
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
