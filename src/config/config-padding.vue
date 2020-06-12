<template>
  <div>
    <div class="cpd-section">
      <div class="cpd-item">
        <label for="">上间距</label>
        <el-input
          :style="{ width: inputWidth }"
          type="text"
          :placeholder="config.placeholder"
          v-model="currentValue[0]"
        ></el-input>
        <span class="cpd-item-append" v-text="config.append">}</span>
      </div>
      <div class="cpd-item">
        <label for="">下间距</label>
        <el-input
          :style="{ width: inputWidth }"
          type="text"
          :placeholder="config.placeholder"
          v-model="currentValue[2]"
        ></el-input>
        <span class="cpd-item-append" v-text="config.append">}</span>
      </div>
    </div>
    <div class="cpd-section">
      <div class="cpd-item">
        <label for="">左间距</label>
        <el-input
          :style="{ width: inputWidth }"
          type="text"
          :placeholder="config.placeholder"
          v-model="currentValue[3]"
        ></el-input>
        <span class="cpd-item-append" v-text="config.append">}</span>
      </div>
      <div class="cpd-item">
        <label for="">右间距</label>
        <el-input
          :style="{ width: inputWidth }"
          type="text"
          :placeholder="config.placeholder"
          v-model="currentValue[1]"
        ></el-input>
        <span class="cpd-item-append" v-text="config.append">}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { isEqual } from 'lodash'
import base from './mixins/base'
export default {
  name: 'ConfigPadding',
  mixins: [base],
  props: {
    value: {
      type: Array,
      default() {
        return ['0', '0', '0', '0']
      }
    },
    config: {
      type: Object,
      default() {
        return {
          placeholder: '',
          append: ''
        }
      }
    }
  },
  data() {
    return {
      currentValue: this.formatValueHandle(this.value),
      inputWidth: '50px'
    }
  },
  computed: {
    formatValue() {
      return this.formatValueHandle(this.value)
    },
    formatCurrentValue() {
      return this.currentValue.map(item => '' + item + this.config.append)
    }
  },
  watch: {
    value() {
      if (!isEqual(this.formatValue, this.currentValue)) {
        this.currentValue = this.formatValue
      }
    },
    currentValue() {
      this.$emit('input', this.formatCurrentValue)
    }
  },
  methods: {
    formatValueHandle(value) {
      return value.map(item => (item + '').split(this.config.append)[0] || 0)
    }
  }
}
</script>
<style lang="scss">
.cpd-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .cpd-item {
    flex-shrink: 0;
    color: #606266;
    font-size: 12px;
    label {
      margin-right: 5px;
    }
    input {
      padding-left: 8px;
      padding-right: 5px;
    }
    &-append {
      margin-left: 2px;
    }
  }
}
</style>
