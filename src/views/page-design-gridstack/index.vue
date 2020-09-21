<!--
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-09-09 11:15:17
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-18 17:50:18
-->
<template>
  <div class="fd-page-design">
    <div class="head">
      <div class="head-center"></div>
      <div class="head-right">
        <el-button
          size="mini"
          icon="el-icon-view"
          :loading="loading.preview"
          @click="onAction('preview')"
          >预览</el-button
        >
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
    <entity-preview-drawer v-if="drawer.entity" @on-close="onCloseDrawer" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import FdDesignPane from '@/components/basic/FdDesignPane3'
import FdComponentPane from '@/components/basic/FdComponentPane2'
import FdConfigPane from '@/components/basic/FdConfigPane'
import EntityPreviewDrawer from './dialog/EntityPreviewDrawer'
export default {
  name: 'PageDesignGridstack',
  components: {
    FdConfigPane,
    FdComponentPane,
    FdDesignPane,
    EntityPreviewDrawer
  },
  data() {
    return {
      loading: {
        init: false,
        preview: false,
        save: false,
        publish: false
      },
      drawer: {
        entity: false
      }
    }
  },
  computed: {
    ...mapGetters(['toc', 'selectId'])
  },
  methods: {
    ...mapMutations(['updateMode']),
    async onAction(type) {
      if (type === 'preview') {
        return this.onOpenDrawer('entity')
      } else if (type === 'save') {
        console.log(this.toc.children)
      }
    },
    onOpenDrawer(name) {
      this.updateMode('common')
      this.drawer[name] = true
    },
    onCloseDrawer({ name }) {
      this.updateMode('edit')
      this.drawer[name] = false
    }
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
