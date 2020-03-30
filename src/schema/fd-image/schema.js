const Image = {
  name: 'FdImage',
  label: '图片组件',
  icon: 'input',
  tips: '',
  props: {
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
