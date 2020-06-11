<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-03-30 16:32:00
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-10 18:22:34
-->
<template>
  <div class="fd-page-preview">
    <template v-for="item of formItems">
      <fd-component :key="item.id" :data="item" />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
export default {
  name: 'FdPagePreview',
  components: {
    FdComponent
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'preview'
    }
  },
  computed: {
    ...mapGetters(['toc'])
  },
  data() {
    return {
      form: {},
      formItems: []
    }
  },
  mounted() {
    if (this.mode === 'preview') {
      this.formItems = Utils.deepClone(this.toc).children
    } else {
      const { productData } = this.data
      this.formItems = productData ? JSON.parse(productData).children : []
    }
    if (this.formItems.length) {
      for (const item of this.formItems) {
        this.$set(this.form, item.id, item.props.value)
      }
    }
  },
  methods: {
    onValidate(cb) {
      this.$refs.form.validate(valid => {
        if (valid) {
          Utils.isFunction(cb) && cb(this.form)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-page-preview {
  ::v-deep {
    .el-form-item__label {
      margin-top: 4px;
      margin-bottom: 0;
      padding-bottom: 6px;
      line-height: 1;
    }
  }
}
</style>
