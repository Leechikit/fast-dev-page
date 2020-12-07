<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-29 09:49:02
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-11-05 11:13:03
-->
<template>
  <div
    class="grid-stack-item"
    :class="{
      'is-active': isActive,
      'is-static': isStatic
    }"
    @click.stop="$emit('click')"
  >
    <div class="grid-stack-item-content">
      <slot :remove="remove"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GridStackItem',
  props: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    isActive: Boolean,
    isStatic: Boolean
  },
  inject: ['addItem', 'removeItem'],
  mounted() {
    this.$el.$gs_change = this.onChange
    this.addItem({
      el: this.$el,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      autoPosition: false
    })
  },
  methods: {
    onChange(e) {
      this.$emit('change', e)
      this.$emit('update:x', e.x)
      this.$emit('update:y', e.y)
      this.$emit('update:width', e.width)
      this.$emit('update:height', e.height)
    },
    remove(callback) {
      this.removeItem(this.$el)
      if (typeof callback === 'function') callback()
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-stack-item {
  .grid-stack-item-content {
    background-color: #fff;
    overflow-y: hidden;
    cursor: move;
  }
  &.is-active {
    .grid-stack-item-content {
      border: 1px dashed $--color-primary;
    }
  }
  &.is-static {
    .grid-stack-item-content {
      background-color: transparent;
      cursor: initial;
    }
  }
  // ::v-deep .ui-resizable-handle {
  //   width: 30px;
  //   height: 24px;
  //   right: 0 !important;
  //   bottom: 0 !important;
  //   background-image: none;
  //   transform: none;
  //   &:hover {
  //     background-color: rgba(#fff, 0.2);
  //   }
  // }
}
</style>
