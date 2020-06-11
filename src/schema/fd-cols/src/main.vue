<!--
 * @Description: 多列布局组件
 * @Autor: Lizijie
 * @Date: 2020-06-09 15:10:49
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-06-10 18:29:00
-->
<template>
  <div class="row">
    <div class="col" v-for="(item, $index) in this.list" :key="$index">
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
      console.log(this.id)
      if (this.id) {
        let pitem = find(this.toc.children, { id: this.id })
        console.log(pitem)
        if (!(pitem.children instanceof Array)) {
          pitem.children = []
          for (let i = 0; i < this.cols; i++) {
            pitem.children[i] = []
          }
        }
        this.list = pitem.children
      }
      console.log(this.list)
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  border: 10px solid grey;
  min-height: 60px;
  .col {
    flex: 1;
    &:not(:last-child) {
      border-right: 1px solid grey;
    }
  }
}
</style>
