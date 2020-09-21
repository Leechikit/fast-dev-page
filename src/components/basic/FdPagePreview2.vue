<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-03-30 16:32:00
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-18 18:02:27
-->
<template>
  <div class="fd-page-preview">
    <el-form>
      <div class="grid-stack-preview">
        <div
          class="grid-stack-item"
          v-for="(item, idx) in formItems"
          :key="idx"
          :id="item.id"
          :data-gs-id="item.id"
          :data-gs-x="item.x"
          :data-gs-y="item.y"
          :data-gs-width="item.width"
          :data-gs-height="item.height"
        >
          <div class="grid-stack-item-content ui-draggable-handle">
            <fd-component :data="item" />
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Utils from '@/helper/utils'
import FdComponent from './FdComponent'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'
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
      formItems: [],
      grid: null,
      gridMargin: '1px'
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
    this.initGridStack()
  },
  methods: {
    onValidate(cb) {
      this.$refs.form.validate(valid => {
        if (valid) {
          Utils.isFunction(cb) && cb(this.form)
        }
      })
    },
    initGridStack() {
      this.grid = GridStack.init(
        {
          margin: this.gridMargin,
          staticGrid: true,
          alwaysShowResizeHandle: true,
          cellHeight: '20px',
          disableOneColumnMode: true
        },
        '.grid-stack-preview'
      )
      this.grid.column(16)
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
