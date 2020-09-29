<template>
  <div class="container">
    <div class="sidebar">
      <div class="newWidget grid-stack-item">
        <div class="grid-stack-item-content" style="padding: 40px;">
          <div>
            <span>Drag me in the dashboard!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="grid-stack" data-gs-animate="yes">
        <div
          class="grid-stack-item"
          data-gs-x="0"
          data-gs-y="0"
          data-gs-width="4"
          data-gs-height="2"
        >
          <div class="grid-stack-item-content">1</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'

export default {
  mounted() {
    var grid = GridStack.init({
      // minRow: 1,
      animate: true,
      disableOneColumnMode: true,
      acceptWidgets: () => true,
      dragIn: '.sidebar .newWidget', // class that can be dragged from outside
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
    })

    grid.on('added removed change', function(e, items) {
      var str = ''
      items.forEach(function(item) {
        str += ' (x,y)=' + item.x + ',' + item.y
      })
      console.log(e.type + ' ' + items.length + ' items:' + str)
    })
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
