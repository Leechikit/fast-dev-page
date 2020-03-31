const Image = {
  name: 'FdImage',
  label: '图片组件',
  icon: 'image',
  tips: '',
  configs: {
    url: {
      name: 'ConfigInput',
      label: 'URL',
      value: 'http://iph.href.lu/800x200'
    },
    alt: {
      name: 'ConfigInput',
      label: '图片描述',
      value: '图片'
    }
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
    on: {},
    nativeOn: {}
  }
}

export default Image
