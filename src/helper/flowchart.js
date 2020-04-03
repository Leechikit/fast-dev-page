import G6 from '@antv/g6'

G6.registerNode(
  'flowNode',
  {
    getAnchorPoints() {
      // TODO
      return [
        [0, 0.5],
        [1, 0.5],
        [0.5, 0],
        [0.5, 1]
      ]
    },
    // 设置状态
    setState(name, value, item) {
      if (name === 'active') {
        if (value) {
          this.update(
            {
              linkPoints: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                size: 5,
                fill: '#fff'
              }
            },
            item
          )
        } else {
          this.update(
            {
              linkPoints: {
                top: false,
                bottom: false,
                left: false,
                right: false
              }
            },
            item
          )
        }
      }
    }
  },
  'rect'
)
