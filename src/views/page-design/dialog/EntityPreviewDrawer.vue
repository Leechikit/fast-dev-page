<template>
  <el-drawer
    :visible="true"
    direction="btt"
    size="93.33%"
    :wrapperClosable="false"
    @close="onClose"
  >
    <div class="fd-preview">
      <fd-page-preview />
    </div>
  </el-drawer>
</template>

<script>
import FdPagePreview from '@/components/basic/FdPagePreview'
export default {
  name: 'EntityPreviewDrawer',
  components: {
    FdPagePreview
  },
  data() {
    return {
      pageData: {}
    }
  },
  methods: {
    onClose(type = 'dismiss') {
      this.$emit('on-close', {
        name: 'entity',
        type: type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .fd-page-preview {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 24px;
    top: 24px;
    overflow: auto;
  }
  .el-drawer__header {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0;
  }
  .el-drawer__body {
    padding-top: 16px;
    background-color: #f5f5f5;
  }
}
.fd-preview {
  position: relative;
  width: 640px;
  margin: 0 auto;
  border-top: 20px solid $--color-primary;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
}
</style>
