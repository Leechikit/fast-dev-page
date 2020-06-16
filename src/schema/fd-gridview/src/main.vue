<!--
 * @Description: 子表组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-16 16:39:58
-->
<template>
  <div class="gridview">
    <el-form-item :label="label">
      <template v-if="mode === 'edit'">
        <div class="pane">
          <fd-design-pane :plist="controls" direction="horizontal" />
        </div>
      </template>
      <template v-else>
        <div class="row" :style="{ width: controls.length * 200 + 'px' }">
          <div class="col" v-for="item of controls" :key="item.id">
            <fd-component :data="item" />
          </div>
        </div>
      </template>
    </el-form-item>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import FdDesignPane from '@/components/basic/FdDesignPane'
import FdComponent from '@/components/basic/FdComponent'
export default {
  name: 'FdGridview',
  components: {
    FdDesignPane,
    FdComponent
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
.gridview {
  .pane {
    padding: 0 10px;
  }
  .row {
    display: flex;
    clear: both;
  }
  .col {
    width: 200px;
  }
}
</style>
