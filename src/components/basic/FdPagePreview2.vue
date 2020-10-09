<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-03-30 16:32:00
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-09 14:19:06
-->
<template>
  <div class="fd-page-preview">
    <el-form>
      <div class="grid-stack-preview">
        <GridStack :options="options">
          <GridStackItem
            v-for="item in formItems"
            :key="item.id"
            :x.sync="item.x"
            :y.sync="item.y"
            :width.sync="item.width"
            :height.sync="item.height"
          >
            <fd-component :data="item" />
          </GridStackItem>
        </GridStack>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
import GridStack from '@/components/GridStack/GridStack.vue'
import GridStackItem from '@/components/GridStack/GridStackItem.vue'
import 'gridstack/dist/gridstack.css'
export default {
  name: 'FdPagePreview',
  components: { GridStack, GridStackItem, FdComponent },
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
      formItems: [],
      options: {
        margin: '1px',
        cellHeight: '20px',
        disableOneColumnMode: true,
        staticGrid: true
      }
    }
  },
  created() {
    if (this.mode === 'preview') {
      this.formItems = Utils.deepClone(this.toc).children
    } else {
      const { productData } = this.data
      this.formItems = productData ? JSON.parse(productData).children : []
    }
    // if (this.formItems.length) {
    //   for (const item of this.formItems) {
    //     this.$set(this.form, item.id, item.props.value)
    //   }
    // }
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
