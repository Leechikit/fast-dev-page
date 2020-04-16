import Utils from '@/helper/utils'

export const Tools = [
  {
    group: '节点',
    children: [
      {
        name: 'baseNode',
        icon: 'el-icon-edit',
        data: {
          text: '审批节点',
          rect: {
            width: 120,
            height: 40
          },
          icon: '\ue78c',
          iconFamily: 'element-icons',
          iconSize: 20,
          borderRadius: 0.1,
          name: 'baseNode',
          data: {
            type: 'Approve'
          }
        }
      },
      {
        name: 'baseNode',
        icon: 'el-icon-document-copy',
        data: {
          text: '抄送节点',
          rect: {
            width: 120,
            height: 40
          },
          icon: '\ue787',
          iconFamily: 'element-icons',
          iconSize: 20,
          borderRadius: 0.1,
          name: 'baseNode',
          data: {
            type: 'Circulate'
          }
        }
      },
      {
        name: 'baseNode',
        icon: 'el-icon-document',
        data: {
          text: '经办节点',
          rect: {
            width: 120,
            height: 40
          },
          icon: '\ue785',
          iconFamily: 'element-icons',
          iconSize: 20,
          borderRadius: 0.1,
          name: 'baseNode',
          data: {
            type: 'FillSheet'
          }
        }
      },
      {
        name: 'baseNode',
        icon: 'el-icon-collection',
        data: {
          text: '汇合节点',
          rect: {
            width: 120,
            height: 40
          },
          icon: '\ue75c',
          iconFamily: 'element-icons',
          iconSize: 20,
          borderRadius: 0.1,
          name: 'baseNode',
          data: {
            type: 'Connection'
          }
        }
      },
      {
        name: 'baseNode',
        icon: 'el-icon-files',
        data: {
          text: '子节点',
          rect: {
            width: 120,
            height: 40
          },
          icon: '\ue75b',
          iconFamily: 'element-icons',
          iconSize: 20,
          borderRadius: 0.1,
          name: 'baseNode',
          data: {
            type: 'SubInstance'
          }
        }
      }
    ]
  }
]

export const TooltipTexts = {
  FillSheet: '只能提交数据，提交后进入下一节点',
  Approve: '可同意或驳回流程',
  Circulate: '可提醒相关人员查看流程进度或流程处理结果',
  Connection: '多个节点均处理完成后才能进入下一节点的场景，可用汇合点来实现',
  SubInstance: '可在当前流程中创建另外一个流程'
}

export function getStartAndEndNodes() {
  return [
    {
      id: Utils.guid(),
      name: 'baseNode',
      rect: {
        x: 190,
        y: 61,
        width: 120,
        height: 40
      },
      text: '开始',
      data: {
        type: 'Start'
      },
      borderRadius: 0.1,
      icon: '\ue791',
      iconFamily: 'element-icons',
      iconSize: 20
    },
    {
      id: Utils.guid(),
      type: 0,
      name: 'baseNode',
      tags: [],
      rect: {
        x: 190,
        y: 358,
        width: 120,
        height: 40
      },
      text: '结束',
      data: {
        type: 'End'
      },
      borderRadius: 0.1,
      icon: '\ue7b0',
      iconFamily: 'element-icons',
      iconSize: 20
    }
  ]
}
