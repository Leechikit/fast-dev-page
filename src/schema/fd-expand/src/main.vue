<!--
 * @Description: 展开收起组件
 * @Autor: Lizijie
 * @Date: 2020-10-13 09:37:30
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-12-07 17:51:17
-->
<template>
  <div class="fd-expand" :class="{ 's-edit': mode === 'edit' }">
    <el-collapse v-model="activeName">
      <el-collapse-item :title="title" name="1">
        <div class="container">
          <div class="row">
            <template v-if="mode === 'edit'">
              <fd-design-pane :plist="list" :pid="id" />
            </template>
            <template v-else v-for="item of list">
              <fd-component :key="item.id" :data="item" />
            </template>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { find } from 'lodash'
import FdDesignPane from '@/components/basic/FdDesignPane'
import FdComponent from '@/components/basic/FdComponent'
export default {
  name: 'FdExpand',
  components: {
    FdDesignPane,
    FdComponent
  },
  props: {
    title: {
      type: String,
      default: '展开收起'
    },
    id: {}
  },
  data() {
    return {
      activeName: '1',
      list: []
    }
  },
  computed: {
    ...mapState(['mode']),
    ...mapGetters(['toc'])
  },
  created() {
    this.setList()
  },
  methods: {
    setList() {
      console.log(this.id)
      if (this.id) {
        let pitem = find(this.toc.children, { id: this.id })
        if (!(pitem.children instanceof Array)) {
          pitem.children = []
        }
        this.list = pitem.children
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-expand {
  .header {
    padding: 5px 10px;
    background-color: #fff;
  }
  &.s-edit {
    .container {
      background-color: #f5f5f5;
      border: 10px solid $--color-grey-4;
      min-height: 60px;
      display: flex;
      .row {
        flex: 1;
      }
    }
  }
}
</style>
