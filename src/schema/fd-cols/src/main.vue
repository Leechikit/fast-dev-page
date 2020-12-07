<!--
 * @Description: 多列布局组件
 * @Autor: Lizijie
 * @Date: 2020-06-09 15:10:49
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-12-07 16:55:37
-->
<template>
  <div class="row" :class="{ 's-edit': mode === 'edit' }">
    <div
      class="col"
      v-for="(item, $index) in list"
      :key="$index"
      :style="{ marginRight: $index < list.length - 1 ? space : 0 }"
    >
      <template v-if="mode === 'edit'">
        <fd-design-pane :plist="item" :pid="id" />
      </template>
      <template v-else v-for="otem of item">
        <fd-component :key="otem.id" :data="otem" />
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { find } from 'lodash'
import FdDesignPane from '@/components/basic/FdDesignPane'
import FdComponent from '@/components/basic/FdComponent'
export default {
  name: 'FdCols',
  components: {
    FdDesignPane,
    FdComponent
  },
  props: {
    cols: {
      type: [String, Number],
      default: 2
    },
    space: {
      type: [String, Number],
      default: 0
    },
    id: {}
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['mode']),
    ...mapGetters(['toc'])
  },
  watch: {
    cols() {
      this.setList()
    }
  },
  created() {
    this.setList()
  },
  methods: {
    setList() {
      if (this.id) {
        let pitem = find(this.toc.children, { id: this.id })
        if (!(pitem.children instanceof Array)) {
          pitem.children = []
        }
        // 增加列数
        if (pitem.children.length < this.cols) {
          for (let i = pitem.children.length; i < this.cols; i++) {
            pitem.children[i] = []
          }
          // 减少列数
        } else if (pitem.children.length > this.cols) {
          pitem.children = pitem.children.slice(0, this.cols)
        }
        this.list = pitem.children
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  .col {
    flex: 1;
  }
  &.s-edit {
    border: 10px solid $--color-grey-4;
    min-height: 60px;
    .col {
      &:not(:last-child) {
        border-right: 1px solid $--color-grey-4;
      }
    }
  }
}
</style>
