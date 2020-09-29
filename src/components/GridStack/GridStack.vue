<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-29 09:49:02
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-29 11:38:26
-->
<template>
  <div class="grid-stack-container">
    <div ref="temps" class="grid-stack-temps">
      <slot></slot>
    </div>
    <div ref="gs" class="grid-stack"></div>
  </div>
</template>
<script>
import GridStack from 'gridstack/dist/gridstack.all.js'
import 'gridstack/dist/gridstack.css'

export default {
  name: 'GridStack',
  props: {
    options: {
      type: Object,
      default: () => ({
        // float: false
        // resizable: {
        //   handles: 'e, se, s, sw, w, n, nw, ne'
        // }
      })
    }
  },
  data() {
    return {
      instance: null,
      pre: []
    }
  },
  provide() {
    return {
      addItem: this.addItem,
      removeItem: this.removeItem
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.instance = GridStack.init(this.options, this.$refs.gs)
      this.instance.column(16)
      this.setGridMinHeight()
      this.instance.on('change', (e, items) => {
        items.forEach(item => {
          this.processItemChange(item)
        })
        this.setGridMinHeight()
      })
      this.instance.on('added', (e, items) => {
        items.forEach(item => {
          this.processItemChange(item)
          this.$emit('add', item, this.instance)
        })
        this.setGridMinHeight()
      })
      while (this.pre.length > 0) {
        const args = this.pre.shift()
        this.addItem(...args)
      }
    })
  },
  methods: {
    addItem({ el, ...args }) {
      if (this.instance) {
        this.instance.addWidget(el, args)
      } else {
        this.pre.push({ el, ...args })
      }
    },
    removeItem(...args) {
      if (this.instance) {
        this.instance.removeWidget(...args)
        this.setGridMinHeight()
      }
    },
    processItemChange(item) {
      if (item.el && typeof item.el.$gs_change === 'function') {
        item.el.$gs_change(item)
      }
    },
    setGridMinHeight() {
      if (!this.instance) return
      this.$nextTick(() => {
        const currentRow = +this.instance.engine.getRow() || 0
        const cellHeight = +this.instance.getCellHeight() || 0
        const cellMargin = +this.instance.getMargin() || 0
        const thresholdHeight = 100
        const containerHeight = this.instance.el.parentNode
          ? this.instance.el.parentNode.clientHeight
          : this.instance.el.clientHeight
        const calculateHeight = currentRow * (cellHeight + cellMargin)
        const gridMinHeight = Math.max(
          calculateHeight + thresholdHeight,
          containerHeight
        )
        const minRow = Math.ceil(gridMinHeight / (cellHeight + cellMargin))
        this.instance.el.setAttribute('data-gs-current-row', minRow)
        this.instance.el.style.minHeight = gridMinHeight + 'px'
      })
    }
  }
}
</script>
