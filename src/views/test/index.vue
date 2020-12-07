<template>
  <div class="container">
    <div class="sidebar">
      <div class="newWidget grid-stack-item">
        <div class="grid-stack-item-content" style="padding: 10px;">
          <div>
            <span>Drag me in the dashboard!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container-fluid">
        <h1>Nested grids demo</h1>
        <a class="btn btn-primary" @click="addNewWidget(grid1)" href="#"
          >Add Widget Grid1</a
        >
        <a class="btn btn-primary" @click="addNewWidget(grid2)" href="#"
          >Add Widget Grid2</a
        >
        <br /><br />

        <div class="grid-stack top">
          <div
            class="grid-stack-item"
            data-gs-x="0"
            data-gs-y="0"
            data-gs-width="1"
            data-gs-height="1"
          >
            <div class="grid-stack-item-content">regular item</div>
          </div>
          <div
            class="grid-stack-item"
            data-gs-x="1"
            data-gs-y="0"
            data-gs-width="4"
            data-gs-height="4"
          >
            <div class="grid-stack-item-content">
              nested 1 - can drag items out
              <div class="grid-stack nested1">
                <div
                  class="grid-stack-item sub"
                  data-gs-x="0"
                  data-gs-y="0"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">1</div>
                </div>
                <div
                  class="grid-stack-item sub"
                  data-gs-x="3"
                  data-gs-y="0"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">2</div>
                </div>
                <div
                  class="grid-stack-item sub"
                  data-gs-x="6"
                  data-gs-y="0"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">3</div>
                </div>
                <div
                  class="grid-stack-item sub"
                  data-gs-x="9"
                  data-gs-y="0"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">4</div>
                </div>
                <div
                  class="grid-stack-item sub"
                  data-gs-x="0"
                  data-gs-y="1"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">5</div>
                </div>
                <div
                  class="grid-stack-item sub"
                  data-gs-x="3"
                  data-gs-y="1"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">6</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="grid-stack-item"
            data-gs-x="5"
            data-gs-y="0"
            data-gs-width="3"
            data-gs-height="4"
          >
            <div class="grid-stack-item-content">
              nested 2 - constrained to parent (default)
              <div class="grid-stack nested2">
                <div
                  class="grid-stack-item sub"
                  data-gs-x="0"
                  data-gs-y="0"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">7</div>
                </div>
                <div
                  class="grid-stack-item sub"
                  data-gs-x="0"
                  data-gs-y="3"
                  data-gs-width="3"
                  data-gs-height="1"
                >
                  <div class="grid-stack-item-content">8</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'

export default {
  data() {
    return {
      grid1: null,
      grid2: null,
      count: 9
    }
  },
  methods: {
    addNewWidget: function(grid) {
      var node = {
        x: Math.round(12 * Math.random()),
        y: Math.round(5 * Math.random()),
        width: Math.round(1 + 3 * Math.random()),
        height: Math.round(1 + 3 * Math.random())
      }
      grid.addWidget(
        '<div class="grid-stack-item sub"><div class="grid-stack-item-content">' +
          this.count++ +
          '</div></div>',
        node
      )
      return false
    }
  },
  mounted() {
    // var grid = GridStack.init({
    //   // minRow: 1,
    //   animate: true,
    //   disableOneColumnMode: true,
    //   acceptWidgets: () => true,
    //   dragIn: '.sidebar .newWidget', // class that can be dragged from outside
    //   dragInOptions: {
    //     scroll: false,
    //     appendTo: 'body',
    //     helper: event => {
    //       return event.currentTarget.cloneNode(true)
    //     },
    //     revert: () => {
    //       return true
    //     }
    //   }
    // })

    // grid.on('added removed change', function(e, items) {
    //   var str = ''
    //   items.forEach(function(item) {
    //     str += ' (x,y)=' + item.x + ',' + item.y
    //   })
    //   console.log(e.type + ' ' + items.length + ' items:' + str)
    // })
    var nestOptions = {
      // acceptWidgets: '.grid-stack-item.sub', // only pink sub items can be inserted, otherwise grid-items causes all sort of issues
      dragOut: true, // let us drag them out!
      disableOneColumnMode: true, // nested are small, but still want N columns
      margin: 1,
      acceptWidgets: function() {
        console.log(this.column)
        if (this.column === 1) {
          return false
        } else {
          return true
        }
      },
      dragIn: '.sidebar .grid-stack-item', // class that can be dragged from outside
      dragInOptions: {
        scroll: false,
        appendTo: 'body',
        helper: event => {
          return event.currentTarget.cloneNode(true)
        },
        revert: () => {
          return true
        }
      }
    }

    var grid = GridStack.init(nestOptions, '.grid-stack.top')
    // nestOptions.acceptWidgets = true
    this.grid1 = GridStack.init(nestOptions, '.grid-stack.nested1')
    this.grid1.on('dragstart', () => {
      grid.disable(true)
    })
    this.grid1.setColumn(1)
    this.grid2 = GridStack.init(nestOptions, '.grid-stack.nested2')
    this.grid2.setColumn(1)
  }
}
</script>
<style lang="scss" scoped>
.newWidget {
  width: 300px;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
}

.btn {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

a {
  text-decoration: none;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.grid-stack {
  background: lightgoldenrodyellow;
}

.grid-stack-item-content {
  color: #2c3e50;
  text-align: center;
  background-color: #18bc9c;
}
.container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  .sidebar {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 250px;
    border-right: 1px solid #e3e3e3;
    padding: 15px 0;
  }
  .main {
    position: absolute;
    top: 0;
    left: 250px;
    // right: 280px;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
  }
  .panel {
    position: absolute;
    width: 280px;
    bottom: 0;
    right: 0;
    top: 0;
    border-left: 1px solid #e3e3e3;
    overflow: auto;
  }
}
</style>
