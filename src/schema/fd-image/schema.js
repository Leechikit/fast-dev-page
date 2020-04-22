const Image = {
  name: 'FdImage',
  label: '图片组件',
  icon: 'image',
  tips: '',
  configs: {
    url: {
      name: 'ConfigInput',
      label: 'URL',
      value:
        'https://www.baidu.com/img/dongdiqiu_e991bad6a2fe51ffcdaf1db6d5cb0e36.gif'
    },
    alt: {
      name: 'ConfigInput',
      label: '图片描述',
      value: '图片'
    }
  },
  layout: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 400,
    defaultWidth: 800,
    defaultHeight: 200
  },
  props: {},
  rules: {
    required: false,
    message: ''
  },
  className: {},
  style: {},
  children: null,
  events: {
    on: {
      test: `console.log('hi')`
    },
    nativeOn: {}
  }
}

export default Image
