const Image = {
  name: 'FdImage',
  label: '图片组件',
  icon: 'input',
  tips: '',
  attrs: {
    name: '',
    autocomplete: 'off',
    placeholder: '',
    max: null,
    min: null,
    step: null,
    readonly: false,
    autofocus: false
  },
  props: {
    url: 'http://iph.href.lu/800x200',
    name: '图片',
    type: '',
    value: '',
    maxlength: null,
    minlength: null,
    clearable: false,
    disabled: false,
    size: '',
    autosize: false,
    resize: '',
    'prefix-icon': '',
    'suffix-icon': '',
    'show-password': false,
    'validate-event': true,
    'show-word-limit': false
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
