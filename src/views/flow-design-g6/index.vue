<template>
  <div class="fd-flow-design">
    <div class="head">
      <div class="head-center"></div>
      <div class="head-right">
        <el-button size="mini" icon="el-icon-finished" :loading="loading.save"
          >保存</el-button
        >
      </div>
    </div>
    <div class="container">
      <div class="sidebar">
        <fd-node-pane />
      </div>
      <div class="main">
        <fd-flow-pane />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FdFlowPane from './comp/FdFlowPane'
import FdNodePane from './comp/FdNodePane'

export default {
  name: 'FdFlowDesignG6',
  components: {
    FdNodePane,
    FdFlowPane
  },
  computed: {
    ...mapGetters(['toc', 'selectIndex', 'isFormPage'])
  },
  data() {
    return {
      sidebarItemActive: false,
      siteName: '',
      radioType: this.$route.query.mode,
      hadEntity: null,
      fieldData: [],
      drawer: {
        entity: false
      },
      loading: {
        init: false,
        preview: false,
        save: false,
        publish: false
      },
      page: {
        ...this.$route.params,
        ...this.$route.query
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.fd-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  text-align: center;
  > span {
    color: #999;
  }
  .fd-icon {
    margin: 0;
  }
}
.fd-flow-design {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  .head {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #fff;
    z-index: 4;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    &-left {
      i {
        margin-right: 8px;
        cursor: pointer;
      }
    }
    &-right {
      min-width: 240px;
      text-align: right;
    }
    ::v-deep {
      .el-radio-button__inner {
        border-radius: 0;
      }
      .is-active {
        /* .el-radio-button__inner {
          color: #fff;
          background-color: $--color-primary;
        } */
      }
    }
  }
  .container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 54px;
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
      right: 280px;
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
}
</style>
