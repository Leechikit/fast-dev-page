<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-09 17:36:25
-->
<template>
  <div class="grid-stack">
    <div
      class="grid-stack-item"
      v-for="(item, idx) in serializedData"
      :key="idx"
      :data-gs-x="item.x"
      :data-gs-y="item.y"
      :data-gs-width="item.width"
      :data-gs-height="item.height"
    >
      <div class="grid-stack-item-content ui-draggable-handle"></div>
    </div>
  </div>
</template>
<script>
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'
export default {
  name: 'PageDesignGridstack',
  data() {
    return {
      grid: null,
      serializedData: [
        { x: 0, y: 0, width: 2, height: 2 },
        { x: 2, y: 3, width: 3, height: 1 },
        { x: 1, y: 3, width: 1, height: 1 }
      ]
    }
  },
  mounted() {
    this.grid = GridStack.init({
      margin: 1
    })
    // this.grid.load(this.serializedData)
  }
}
</script>
<style lang="scss" scoped>
.grid-stack-item-content {
  background-color: red;
}
</style>
