<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-12 18:12:14
-->
<template>
  <div
    class="fd-design-pane"
    :class="{
      'fd-dnd-placeholder': !isDraging && plist.length === 0
    }"
  >
    <el-form>
      <div class="fd-dnd-area">
        <FdDesign :plist="plist" :options="options" @dragIn="onDragIn" />
      </div>
    </el-form>
    <!-- <div class="fd-dnd-background"></div> -->
  </div>
</template>
<script>
import FdDesign from './FdDesign'
export default {
  name: 'PageDesignGridstack',
  components: { FdDesign },
  props: {
    plist: {
      type: Array
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isDraging: false
    }
  },
  methods: {
    onDragIn(value) {
      this.isDraging = value
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-design-pane {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ::v-deep .el-form {
    // position: relative;
    // z-index: 1;
    height: 100%;
  }
}
.fd-dnd-area {
  width: 800px;
  margin: 0 auto;
}
.fd-dnd-placeholder {
  &::after {
    content: '从左侧拖拽来添加数据项';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    color: #999;
    white-space: nowrap;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.fd-dnd-background {
  position: absolute;
  left: 50%;
  top: 0;
  width: 800px;
  height: 100%;
  background-color: rgba(#dcdfe6, 0.5);
  background-image: -webkit-linear-gradient(top, transparent 18px, #fff 20px),
    -webkit-linear-gradient(left, transparent 48px, #fff 50px);
  background-size: 50px 20px;
  transform: translateX(-50%);
}
</style>
