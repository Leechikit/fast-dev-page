<!--
 * @Description: 子表组件
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-16 17:04:37
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
        <div class="pane">
          <div class="table" :style="{ width: list.length * 200 + 'px' }">
            <div class="row">
              <div class="col" v-for="item of list" :key="item.id">
                <span v-text="item.configs.label.value"></span>
              </div>
            </div>
            <div class="row">
              <div class="col" v-for="item of list" :key="item.id">
                <fd-component :data="item" />
              </div>
            </div>
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
import Utils from '@/helper/utils'
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
    return {}
  },
  computed: {
    ...mapState(['mode']),
    list() {
      return Utils.deepClone(this.controls).map(item => {
        if (item.configs.labelVisible) {
          item.configs.labelVisible.value = false
        }
        return item
      })
    }
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
    overflow: auto;
    clear: both;
  }
  .row {
    display: flex;
  }
  .col {
    width: 200px;
    display: flex;
    align-items: center;
  }
}
</style>
