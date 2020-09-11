<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-11 09:02:10
-->
<template>
  <div class="fd-page-design">
    <div class="head">
      <div class="head-center"></div>
      <div class="head-right">
        <el-button
          size="mini"
          icon="el-icon-finished"
          :loading="loading.save"
          @click="onAction('save')"
          >保存</el-button
        >
      </div>
    </div>
    <div class="container">
      <div class="sidebar">
        <fd-component-pane :type="['PAGE', 'LAYOUT', 'FORM']" />
      </div>
      <div class="main">
        <fd-design-pane :plist="toc.children" />
      </div>
      <div class="panel">
        <fd-config-pane :key="selectId" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FdDesignPane from '@/components/basic/FdDesignPane3'
import FdComponentPane from '@/components/basic/FdComponentPane2'
import FdConfigPane from '@/components/basic/FdConfigPane'
export default {
  name: 'PageDesignGridstack',
  components: {
    FdConfigPane,
    FdComponentPane,
    FdDesignPane
  },
  data() {
    return {
      loading: {
        init: false,
        preview: false,
        save: false,
        publish: false
      }
    }
  },
  computed: {
    ...mapGetters(['toc', 'selectId'])
  },
  methods: {
    async onAction() {}
  }
}
</script>
<style lang="scss" scoped>
.fd-page-design {
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
      // right: 0;
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
