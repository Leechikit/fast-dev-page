import { registerNode } from 'topology-core/middles'
import Utils from '@/helper/utils'

// import {
//   flowData,
//   flowDataAnchors,
//   flowDataIconRect,
//   flowDataTextRect,
//   flowSubprocess,
//   flowSubprocessIconRect,
//   flowSubprocessTextRect,
//   flowDb,
//   flowDbIconRect,
//   flowDbTextRect,
//   flowDocument,
//   flowDocumentAnchors,
//   flowDocumentIconRect,
//   flowDocumentTextRect,
//   flowInternalStorage,
//   flowInternalStorageIconRect,
//   flowInternalStorageTextRect,
//   flowExternStorage,
//   flowExternStorageAnchors,
//   flowExternStorageIconRect,
//   flowExternStorageTextRect,
//   flowQueue,
//   flowQueueIconRect,
//   flowQueueTextRect,
//   flowManually,
//   flowManuallyAnchors,
//   flowManuallyIconRect,
//   flowManuallyTextRect,
//   flowDisplay,
//   flowDisplayAnchors,
//   flowDisplayIconRect,
//   flowDisplayTextRect,
//   flowParallel,
//   flowParallelAnchors,
//   flowComment,
//   flowCommentAnchors
// } from 'topology-flow-diagram'

import {
  base,
  baseIconRect,
  baseTextRect
} from '@/views/flow-design/nodes/index'

export function canvasRegister() {
  registerNode('baseNode', base, null, baseIconRect, baseTextRect)
  // Register flow diagrams.
  // registerNode(
  //   'flowData',
  //   flowData,
  //   flowDataAnchors,
  //   flowDataIconRect,
  //   flowDataTextRect
  // )
  // registerNode(
  //   'flowSubprocess',
  //   flowSubprocess,
  //   null,
  //   flowSubprocessIconRect,
  //   flowSubprocessTextRect
  // )
  // registerNode('flowDb', flowDb, null, flowDbIconRect, flowDbTextRect)
  // registerNode(
  //   'flowDocument',
  //   flowDocument,
  //   flowDocumentAnchors,
  //   flowDocumentIconRect,
  //   flowDocumentTextRect
  // )
  // registerNode(
  //   'flowInternalStorage',
  //   flowInternalStorage,
  //   null,
  //   flowInternalStorageIconRect,
  //   flowInternalStorageTextRect
  // )
  // registerNode(
  //   'flowExternStorage',
  //   flowExternStorage,
  //   flowExternStorageAnchors,
  //   flowExternStorageIconRect,
  //   flowExternStorageTextRect
  // )
  // registerNode(
  //   'flowQueue',
  //   flowQueue,
  //   null,
  //   flowQueueIconRect,
  //   flowQueueTextRect
  // )
  // registerNode(
  //   'flowManually',
  //   flowManually,
  //   flowManuallyAnchors,
  //   flowManuallyIconRect,
  //   flowManuallyTextRect
  // )
  // registerNode(
  //   'flowDisplay',
  //   flowDisplay,
  //   flowDisplayAnchors,
  //   flowDisplayIconRect,
  //   flowDisplayTextRect
  // )
  // registerNode('flowParallel', flowParallel, flowParallelAnchors, null, null)
  // registerNode('flowComment', flowComment, flowCommentAnchors, null, null)
}

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
            type: 'approve'
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
            type: 'circulate'
          }
        }
      }
    ]
  }
  // {
  //   group: '基本形状',
  //   children: [
  //     {
  //       name: 'rectangle',
  //       icon: 'icon-rect',
  //       data: {
  //         text: 'Topology',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         paddingLeft: 10,
  //         paddingRight: 10,
  //         paddingTop: 10,
  //         paddingBottom: 10,
  //         name: 'rectangle',
  //         icon: '\ue64d',
  //         iconFamily: 'topology',
  //         iconColor: '#2f54eb'
  //       }
  //     },
  //     {
  //       name: 'rectangle',
  //       icon: 'icon-rectangle',
  //       data: {
  //         text: '圆角矩形',
  //         rect: {
  //           width: 200,
  //           height: 50
  //         },
  //         paddingLeft: 10,
  //         paddingRight: 10,
  //         paddingTop: 10,
  //         paddingBottom: 10,
  //         borderRadius: 0.1,
  //         name: 'rectangle'
  //       }
  //     },
  //     {
  //       name: 'circle',
  //       icon: 'icon-circle',
  //       data: {
  //         text: '圆',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'circle',
  //         textMaxLine: 1
  //       }
  //     },
  //     {
  //       name: 'triangle',
  //       icon: 'icon-triangle',
  //       data: {
  //         text: '三角形',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'triangle'
  //       }
  //     },
  //     {
  //       name: 'diamond',
  //       icon: 'icon-diamond',
  //       data: {
  //         text: '菱形',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'diamond'
  //       }
  //     },
  //     {
  //       name: 'pentagon',
  //       icon: 'icon-pentagon',
  //       data: {
  //         text: '五边形',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'pentagon'
  //       }
  //     },
  //     {
  //       name: 'hexagon',
  //       icon: 'icon-hexagon',
  //       data: {
  //         text: '六边形',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         paddingTop: 10,
  //         paddingBottom: 10,
  //         name: 'hexagon'
  //       }
  //     },
  //     {
  //       name: 'pentagram',
  //       icon: 'icon-pentagram',
  //       data: {
  //         text: '五角星',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'pentagram'
  //       }
  //     },
  //     {
  //       name: 'leftArrow',
  //       icon: 'icon-arrow-left',
  //       data: {
  //         text: '左箭头',
  //         rect: {
  //           width: 200,
  //           height: 100
  //         },
  //         name: 'leftArrow'
  //       }
  //     },
  //     {
  //       name: 'rightArrow',
  //       icon: 'icon-arrow-right',
  //       data: {
  //         text: '右箭头',
  //         rect: {
  //           width: 200,
  //           height: 100
  //         },
  //         name: 'rightArrow'
  //       }
  //     },
  //     {
  //       name: 'twowayArrow',
  //       icon: 'icon-twoway-arrow',
  //       data: {
  //         text: '双向箭头',
  //         rect: {
  //           width: 200,
  //           height: 100
  //         },
  //         name: 'twowayArrow'
  //       }
  //     },
  //     {
  //       name: 'line',
  //       icon: 'icon-line',
  //       data: {
  //         text: '直线',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'line'
  //       }
  //     },
  //     {
  //       name: 'cloud',
  //       icon: 'icon-cloud',
  //       data: {
  //         text: '云',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'cloud'
  //       }
  //     },
  //     {
  //       name: 'message',
  //       icon: 'icon-msg',
  //       data: {
  //         text: '消息框',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         paddingLeft: 10,
  //         paddingRight: 10,
  //         paddingTop: 10,
  //         paddingBottom: 10,
  //         name: 'message'
  //       }
  //     },
  //     {
  //       name: 'file',
  //       icon: 'icon-file',
  //       data: {
  //         text: '文档',
  //         rect: {
  //           width: 80,
  //           height: 100
  //         },
  //         paddingLeft: 10,
  //         paddingRight: 10,
  //         paddingTop: 10,
  //         paddingBottom: 10,
  //         name: 'file'
  //       }
  //     },
  //     {
  //       name: 'text',
  //       icon: 'icon-text',
  //       data: {
  //         text: 'le5le-topology / 乐吾乐',
  //         rect: {
  //           width: 160,
  //           height: 30
  //         },
  //         name: 'text'
  //       }
  //     },
  //     {
  //       name: 'image',
  //       icon: 'icon-image',
  //       data: {
  //         text: '',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'image',
  //         image: '/img/logo.png'
  //       }
  //     },
  //     {
  //       name: 'cube',
  //       icon: 'icon-cube',
  //       data: {
  //         rect: {
  //           width: 50,
  //           height: 70
  //         },
  //         is3D: true,
  //         z: 10,
  //         zRotate: 15,
  //         fillStyle: '#ddd',
  //         name: 'cube',
  //         icon: '\ue63c',
  //         iconFamily: 'topology',
  //         iconColor: '#777',
  //         iconSize: 30
  //       }
  //     },
  //     {
  //       name: 'people',
  //       icon: 'icon-people',
  //       data: {
  //         rect: {
  //           width: 70,
  //           height: 100
  //         },
  //         name: 'people'
  //       }
  //     },
  //     {
  //       name: '视频/网页',
  //       icon: 'icon-pc',
  //       data: {
  //         text: '视频/网页',
  //         rect: {
  //           width: 200,
  //           height: 200
  //         },
  //         paddingLeft: 10,
  //         paddingRight: 10,
  //         paddingTop: 10,
  //         paddingBottom: 10,
  //         // strokeStyle: 'transparent',
  //         name: 'div'
  //       }
  //     }
  //   ]
  // },
  // {
  //   group: '流程图',
  //   children: [
  //     {
  //       name: '开始/结束',
  //       icon: 'icon-flow-start',
  //       data: {
  //         text: '开始',
  //         rect: {
  //           width: 120,
  //           height: 40
  //         },
  //         borderRadius: 0.5,
  //         name: 'rectangle'
  //       }
  //     },
  //     {
  //       name: '流程',
  //       icon: 'icon-rectangle',
  //       data: {
  //         text: '流程',
  //         rect: {
  //           width: 120,
  //           height: 40
  //         },
  //         name: 'rectangle'
  //       }
  //     },
  //     {
  //       name: '判定',
  //       icon: 'icon-diamond',
  //       data: {
  //         text: '判定',
  //         rect: {
  //           width: 120,
  //           height: 60
  //         },
  //         name: 'diamond'
  //       }
  //     },
  //     {
  //       name: '数据',
  //       icon: 'icon-flow-data',
  //       data: {
  //         text: '数据',
  //         rect: {
  //           width: 120,
  //           height: 50
  //         },
  //         name: 'flowData'
  //       }
  //     },
  //     {
  //       name: '准备',
  //       icon: 'icon-flow-ready',
  //       data: {
  //         text: '准备',
  //         rect: {
  //           width: 120,
  //           height: 50
  //         },
  //         name: 'hexagon'
  //       }
  //     },
  //     {
  //       name: '子流程',
  //       icon: 'icon-flow-subprocess',
  //       data: {
  //         text: '子流程',
  //         rect: {
  //           width: 120,
  //           height: 50
  //         },
  //         name: 'flowSubprocess'
  //       }
  //     },
  //     {
  //       name: '数据库',
  //       icon: 'icon-db',
  //       data: {
  //         text: '数据库',
  //         rect: {
  //           width: 80,
  //           height: 120
  //         },
  //         name: 'flowDb'
  //       }
  //     },
  //     {
  //       name: '文档',
  //       icon: 'icon-flow-document',
  //       data: {
  //         text: '文档',
  //         rect: {
  //           width: 120,
  //           height: 100
  //         },
  //         name: 'flowDocument'
  //       }
  //     },
  //     {
  //       name: '内部存储',
  //       icon: 'icon-internal-storage',
  //       data: {
  //         text: '内部存储',
  //         rect: {
  //           width: 120,
  //           height: 80
  //         },
  //         name: 'flowInternalStorage'
  //       }
  //     },
  //     {
  //       name: '外部存储',
  //       icon: 'icon-extern-storage',
  //       data: {
  //         text: '外部存储',
  //         rect: {
  //           width: 120,
  //           height: 80
  //         },
  //         name: 'flowExternStorage'
  //       }
  //     },
  //     {
  //       name: '队列',
  //       icon: 'icon-flow-queue',
  //       data: {
  //         text: '队列',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'flowQueue'
  //       }
  //     },
  //     {
  //       name: '手动输入',
  //       icon: 'icon-flow-manually',
  //       data: {
  //         text: '手动输入',
  //         rect: {
  //           width: 120,
  //           height: 80
  //         },
  //         name: 'flowManually'
  //       }
  //     },
  //     {
  //       name: '展示',
  //       icon: 'icon-flow-display',
  //       data: {
  //         text: '展示',
  //         rect: {
  //           width: 120,
  //           height: 80
  //         },
  //         name: 'flowDisplay'
  //       }
  //     },
  //     {
  //       name: '并行模式',
  //       icon: 'icon-flow-parallel',
  //       data: {
  //         text: '并行模式',
  //         rect: {
  //           width: 120,
  //           height: 50
  //         },
  //         name: 'flowParallel'
  //       }
  //     },
  //     {
  //       name: '注释',
  //       icon: 'icon-flow-comment',
  //       data: {
  //         text: '注释',
  //         rect: {
  //           width: 100,
  //           height: 100
  //         },
  //         name: 'flowComment'
  //       }
  //     }
  //   ]
  // }
]

export function getStartAndEndNodes() {
  return [
    {
      id: Utils.guid(),
      type: 0,
      name: 'baseNode',
      tags: [],
      rect: {
        x: 190,
        y: 61,
        width: 120,
        height: 40,
        center: { x: 250, y: 81 },
        ex: 310,
        ey: 101
      },
      lineWidth: 1,
      rotate: 0,
      offsetRotate: 0,
      globalAlpha: 1,
      dash: 0,
      strokeStyle: '#222',
      fillStyle: '',
      font: {
        color: '#222',
        fontFamily:
          '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
        fontSize: 12,
        lineHeight: 1.5,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      animateCycleIndex: 0,
      events: [],
      eventFns: ['link', 'doAnimate', 'doFn'],
      lineDashOffset: 0,
      text: '开始',
      textOffsetX: 0,
      textOffsetY: 0,
      animateType: '',
      data: {
        type: 'start'
      },
      zRotate: 0,
      anchors: [
        { x: 190, y: 81, direction: 4 },
        { x: 250, y: 61, direction: 1 },
        { x: 310, y: 81, direction: 2 },
        { x: 250, y: 101, direction: 3 }
      ],
      rotatedAnchors: [
        { x: 190, y: 81, direction: 4 },
        { x: 250, y: 61, direction: 1 },
        { x: 310, y: 81, direction: 2 },
        { x: 250, y: 101, direction: 3 }
      ],
      animateDuration: 0,
      animateFrames: [],
      borderRadius: 0.1,
      icon: '\ue791',
      iconFamily: 'element-icons',
      iconSize: 20,
      imageAlign: 'center',
      gradientAngle: 0,
      gradientRadius: 0.01,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingLeftNum: 0,
      paddingRightNum: 0,
      paddingTopNum: 0,
      paddingBottomNum: 0,
      textRect: {
        x: 230,
        y: 61,
        width: 80,
        height: 40,
        center: { x: 270, y: 81 },
        ex: 310,
        ey: 101
      },
      fullTextRect: {
        x: 190,
        y: 61,
        width: 120,
        height: 40,
        center: { x: 250, y: 81 },
        ex: 310,
        ey: 101
      },
      iconRect: {
        x: 190,
        y: 61,
        width: 40,
        height: 40,
        center: { x: 210, y: 81 },
        ex: 230,
        ey: 101
      },
      fullIconRect: {
        x: 190,
        y: 61,
        width: 120,
        height: 40,
        center: { x: 250, y: 81 },
        ex: 310,
        ey: 101
      },
      elementRendered: false,
      dockWatchers: [
        { x: 250, y: 81 },
        { x: 191, y: 155 },
        { x: 311, y: 155 },
        { x: 311, y: 195 },
        { x: 191, y: 195 }
      ]
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
        height: 40,
        center: { x: 250, y: 378 },
        ex: 310,
        ey: 398
      },
      lineWidth: 1,
      rotate: 0,
      offsetRotate: 0,
      globalAlpha: 1,
      dash: 0,
      strokeStyle: '#222',
      fillStyle: '',
      font: {
        color: '#222',
        fontFamily:
          '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
        fontSize: 12,
        lineHeight: 1.5,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      animateCycleIndex: 0,
      events: [],
      eventFns: ['link', 'doAnimate', 'doFn'],
      lineDashOffset: 0,
      text: '结束',
      textOffsetX: 0,
      textOffsetY: 0,
      animateType: '',
      data: {
        type: 'end'
      },
      zRotate: 0,
      anchors: [
        { x: 190, y: 378, direction: 4 },
        { x: 250, y: 358, direction: 1 },
        { x: 310, y: 378, direction: 2 },
        { x: 250, y: 398, direction: 3 }
      ],
      rotatedAnchors: [
        { x: 190, y: 378, direction: 4 },
        { x: 250, y: 358, direction: 1 },
        { x: 310, y: 378, direction: 2 },
        { x: 250, y: 398, direction: 3 }
      ],
      animateDuration: 0,
      animateFrames: [],
      borderRadius: 0.1,
      icon: '\ue7b0',
      iconFamily: 'element-icons',
      iconSize: 20,
      imageAlign: 'center',
      gradientAngle: 0,
      gradientRadius: 0.01,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingLeftNum: 0,
      paddingRightNum: 0,
      paddingTopNum: 0,
      paddingBottomNum: 0,
      textRect: {
        x: 230,
        y: 358,
        width: 80,
        height: 40,
        center: { x: 270, y: 378 },
        ex: 310,
        ey: 398
      },
      fullTextRect: {
        x: 190,
        y: 358,
        width: 120,
        height: 40,
        center: { x: 250, y: 378 },
        ex: 310,
        ey: 398
      },
      iconRect: {
        x: 190,
        y: 358,
        width: 40,
        height: 40,
        center: { x: 210, y: 378 },
        ex: 230,
        ey: 398
      },
      fullIconRect: {
        x: 190,
        y: 358,
        width: 120,
        height: 40,
        center: { x: 250, y: 378 },
        ex: 310,
        ey: 398
      },
      elementRendered: false,
      dockWatchers: [
        { x: 250, y: 378 },
        { x: 191, y: 461 },
        { x: 311, y: 461 },
        { x: 311, y: 501 },
        { x: 191, y: 501 }
      ]
    }
  ]
}
