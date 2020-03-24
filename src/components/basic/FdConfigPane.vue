<template>
  <div class="fd-config">
    <div class="fd-config-form" v-if="isFormPage">
      <nav class="fd-config-nav">
        <span
          :class="{
            'is-active': isActiveTab === tab.value
          }"
          :key="tab.value"
          v-for="tab in tabs"
          @click="onPick(tab.value)"
        >
          <span>{{ tab.label }}</span>
        </span>
      </nav>
      <div class="fd-config-pane-wrap">
        <div class="fd-config-pane" v-show="isActiveTab === 'field'">
          <template v-if="selectComponent">
            <div class="fd-field-conf-pane">
              <el-form size="mini" label-position="top">
                <div class="fd-field-conf">
                  <el-form-item label="字段标题">
                    <el-input v-model.trim="selectComponent.label" clearable />
                  </el-form-item>
                  <el-form-item label="字段编码">
                    <el-input
                      @blur="onInputBlur"
                      v-model.trim="selectComponent.id"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item
                    label="占位文字"
                    v-if="
                      ['ElInput', 'ElSelect', 'ElDatePicker'].includes(
                        selectComponent.name
                      )
                    "
                  >
                    <el-input
                      v-if="selectComponent.name === 'ElInput'"
                      v-model.trim="selectComponent.attrs.placeholder"
                      clearable
                    />
                    <el-input
                      v-else
                      v-model.trim="selectComponent.props.placeholder"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="辅助文字">
                    <el-input v-model.trim="selectComponent.tips" clearable />
                  </el-form-item>
                </div>
                <div
                  class="fd-field-conf"
                  v-if="selectComponent.name === 'ElDatePicker'"
                >
                  <el-form-item label="类型">
                    <el-radio-group
                      class="mt-8"
                      size="mini"
                      v-model="selectComponent.props.type"
                    >
                      <el-radio-button label="date">日期</el-radio-button>
                      <el-radio-button label="daterange"
                        >日期范围</el-radio-button
                      >
                      <el-radio-button label="datetimerange"
                        >日期时间范围</el-radio-button
                      >
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div
                  class="fd-field-conf"
                  v-if="
                    selectComponent.children && selectComponent.children.length
                  "
                >
                  <el-form-item label="选项">
                    <!-- <fd-data-option :data="selectComponent" /> -->
                  </el-form-item>
                </div>
                <div class="fd-field-conf">
                  <el-form-item label="校验">
                    <el-checkbox
                      label="必填"
                      v-model="selectComponent.rules.required"
                      @change="onRequireCheck"
                    />
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </template>
          <template v-else>
            <span class="is-empty">{{ emptyText }}</span>
          </template>
        </div>
        <div class="fd-config-pane" v-show="isActiveTab === 'form'">
          <div class="fd-form-conf-pane">
            <div class="fd-form-conf">
              <div class="fd-form-conf-hd">
                <strong>表单提交校验</strong>
              </div>
              <div class="fd-form-conf-bd">
                <el-button size="mini">添加校验条件</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fd-config-show" v-if="isShowPage">
      <div class="fd-config-pane" v-if="selectComponent">
        <el-form size="mini" label-position="top">
          <div class="fd-field-conf">
            <el-form-item>
              <template slot="label">
                <span>数据源</span>
                <span
                  class="el-button el-button--text el-button--mini"
                  @click="onOpenDialog('dataSource')"
                  >选择数据源</span
                >
              </template>
              <!-- <fd-data-source-list :key="selectComponent.dataSource.qdevEntityId" type="selected" v-if="selectComponent.dataSource" /> -->
            </el-form-item>
          </div>
          <template v-if="selectComponent.name === 'FdTable'">
            <div class="fd-field-conf">
              <el-form-item label="标题">
                <el-input v-model.trim="selectComponent.label" clearable />
              </el-form-item>
              <el-form-item label="辅助文字">
                <el-input v-model.trim="selectComponent.tips" clearable />
              </el-form-item>
              <el-form-item label="数据显示">
                <el-checkbox>显示序号</el-checkbox>
              </el-form-item>
              <el-form-item label="表格冻结"></el-form-item>
            </div>
          </template>
        </el-form>
      </div>
      <template v-else>
        <span class="is-empty">{{ emptyText }}</span>
      </template>
      <!-- <fd-data-source-dialog v-if="dialog.dataSource" @on-close="onCloseDialog" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import FdDataOption from './FdInputOption'
// import FdDataSourceDialog from './FdDataSourceDialog'
// import FdDataSourceList from './FdDataSourceList'
export default {
  name: 'FdConfigPane',
  components: {
    // FdDataSourceList,
    // FdDataSourceDialog,
    // FdDataOption
  },
  computed: {
    ...mapGetters([
      'toc',
      'selectComponent',
      'isFormPage',
      'isShowPage',
      'selectSource'
    ]),
    emptyText() {
      const { children } = this.toc.children[0]
      return children && children.length
        ? '请选择一个组件来设置属性'
        : '请添加组件'
    }
  },
  data() {
    return {
      isActiveTab: 'field',
      code: '',
      tabs: [
        { label: '字段设置', value: 'field' },
        { label: '表单设置', value: 'form' }
      ],
      dialog: {
        dataSource: false
      }
    }
  },
  mounted() {
    this.code = this.selectComponent && this.selectComponent.id
  },
  methods: {
    onPick(name) {
      this.isActiveTab = name
    },
    onInputBlur() {
      if (this.selectComponent.id === '') {
        this.selectComponent.id = this.code
      }
    },
    onRequireCheck(val) {
      this.$set(this.selectComponent.rules, 'required', val)
      this.$set(
        this.selectComponent.rules,
        'message',
        val ? '该字段为必填项' : ''
      )
      this.$set(this.selectComponent.rules, 'trigger', 'blur')
    },
    onOpenDialog(name) {
      this.dialog[name] = true
    },
    onCloseDialog({ name }) {
      this.dialog[name] = false
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
.fd-config-show {
  padding-top: 4px;
  ::v-deep {
    .el-button--text {
      padding: 0;
    }
    .el-form-item__label,
    .el-form-item__content {
      display: flex;
      align-items: center;
    }
    .el-form-item__label {
      width: 100%;
      justify-content: space-between;
    }
  }
}
.fd-config {
  position: relative;
  height: 100%;
  overflow-y: auto;
  font-size: 12px;
  &-nav {
    display: flex;
    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      width: 50%;
      height: 54px;
      padding-top: 2px;
      text-align: center;
      border-bottom: 2px solid #e3e3e3;
      font-size: 14px;
    }
    .is-active {
      border-color: $--color-primary;
    }
    i {
      margin-right: 4px;
    }
  }
  &-pane-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 54px;
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
.fd-form-conf {
  margin: 0 16px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: 0;
  }
  &-pane {
    margin-top: 16px;
  }
  &-hd {
    margin-bottom: 10px;
    > strong {
      font-size: 14px;
    }
  }
  &-bd {
    .el-button {
      width: 100%;
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
