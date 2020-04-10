<template>
  <div class="fd-config">
    <div class="fd-config-form">
      <div class="fd-config-pane-wrap">
        <div class="fd-config-pane">
          <template v-if="!props.node && !props.line && !props.multi">
            <span class="is-empty">请选择节点或线</span>
          </template>
          <template v-else>
            <div class="fd-field-conf-pane">
              <el-form size="mini" label-position="top">
                <div class="fd-field-conf">
                  <template v-if="props.node">
                    <el-form-item label="节点编码">
                      <el-input
                        @blur="onChange"
                        v-model.trim="props.node.id"
                        disabled
                      />
                    </el-form-item>
                    <el-form-item label="节点名称">
                      <el-input
                        @blur="onChange"
                        v-model.trim="props.node.text"
                      />
                    </el-form-item>
                  </template>
                  <template v-if="props.line">
                    <el-form-item label="连接线编码">
                      <el-input
                        @blur="onChange"
                        v-model.trim="props.line.id"
                        disabled
                      />
                    </el-form-item>
                    <el-form-item label="连接线名称">
                      <el-input
                        @blur="onChange"
                        v-model.trim="props.line.text"
                      />
                    </el-form-item>
                  </template>
                </div>
              </el-form>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    props: {
      type: Object,
      require: true
    }
  },
  watch: {
    props() {
      console.log(this.props)
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.props.node)
    }
  }
}
</script>

<style lang="scss" scoped>
.fd-config-form {
  ::v-deep {
    .el-form-item__label {
      padding-bottom: 0;
    }
  }
  .fd-field-conf {
    padding-bottom: 6px;
  }
}
.fd-config {
  position: relative;
  height: 100%;
  overflow-y: auto;
  font-size: 12px;
  &-pane-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    overflow-y: auto;
  }
}
.fd-field-conf {
  margin: 10px 12px 12px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  ::v-deep {
    .el-form-item__label {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
.is-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #999;
  white-space: nowrap;
}
</style>
