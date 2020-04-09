import { registerNode } from 'topology-core/middles'
import Utils from '@/helper/utils'

import {
  base,
  baseIconRect,
  baseTextRect
} from '@/views/flow-design/nodes/index'

export function canvasRegister() {
  registerNode('start', base, null, baseIconRect, baseTextRect)
  registerNode('end', base, null, baseIconRect, baseTextRect)
  registerNode('approve', base, null, baseIconRect, baseTextRect)
  registerNode('circulate', base, null, baseIconRect, baseTextRect)
}

export const Tools = [
  {
    group: '节点',
    children: [
      {
        name: 'approve',
        icon: 'el-icon-edit',
        data: {
          text: '审批节点',
          rect: {
            width: 120,
            height: 40
          },
          borderRadius: 0.1,
          name: 'approve'
        }
      },
      {
        name: 'circulate',
        icon: 'el-icon-paperclip',
        data: {
          text: '抄送节点',
          rect: {
            width: 120,
            height: 40
          },
          borderRadius: 0.1,
          name: 'circulate'
        }
      }
    ]
  }
]

export function getStartAndEndNodes() {
  return [
    {
      id: Utils.guid(),
      type: 0,
      name: 'start',
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
      data: '',
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
      iconSize: null,
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
      name: 'end',
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
      data: '',
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
      iconSize: null,
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
