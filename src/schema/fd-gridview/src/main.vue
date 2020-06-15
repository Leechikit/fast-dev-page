<!--
 * @Description: 子表组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-12 17:48:10
-->
<template>
  <div class="gridview">
    <template v-if="labelVisible">
      <el-form-item :label="label">
        <template v-if="mode === 'edit'">
          <div class="col">
            <fd-design-pane :plist="controls" direction="horizontal" />
          </div>
        </template>
      </el-form-item>
    </template>
    <template v-else>
      <fd-design-pane :plist="controls" direction="horizontal" />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import FdDesignPane from '@/components/basic/FdDesignPane'
// import FdComponent from '@/components/basic/FdComponent'
export default {
  name: 'FdGridview',
  components: {
    FdDesignPane
    // FdComponent
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['mode'])
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}
.col {
  height: 100px;
}
</style>
