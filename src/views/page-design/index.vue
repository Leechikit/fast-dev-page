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
        <fd-component-pane :type="page.pageType" />
      </div>
      <div class="main">
        <fd-design-pane :plist="toc.children" :pid="toc.id" />
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
import FdDesignPane from '@/components/basic/FdDesignPane'
import FdComponentPane from '@/components/basic/FdComponentPane'
import FdConfigPane from '@/components/basic/FdConfigPane'
import EntityPreviewDrawer from './dialog/EntityPreviewDrawer'

export default {
  name: 'FdPageDesign',
  components: {
    FdConfigPane,
    FdComponentPane,
    FdDesignPane,
    EntityPreviewDrawer
  },
  computed: {
    ...mapGetters(['toc', 'selectId', 'isFormPage'])
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
  mounted() {},
  methods: {
    ...mapMutations(['updateMode']),
    async onAction(type) {
      if (type === 'preview') {
        return this.onOpenDrawer('entity')
      } else {
        const { children } = this.toc.children[0]
        if (!children.length) {
          return this.$message.warning(`页面内容不能为空`)
        }
        this.loading[type] = true
        try {
          console.log(this.toc)
        } catch (e) {
          console.log(e)
        } finally {
          this.loading[type] = false
        }
        return true
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
