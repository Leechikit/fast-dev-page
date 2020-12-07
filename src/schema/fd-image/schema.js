/*
 * @Description:
 * @Autor: Lizijie
 * @Date: 2020-03-30 14:14:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-11-30 18:20:24
 */
const Image = {
  name: 'FdImage',
  label: '图片组件',
  icon: 'image',
  tips: '',
  component: {
    class: 'fd-image',
    props: {},
    style: {},
    children: null,
    on: {
      click: `alert('hi')`
    },
    nativeOn: {}
  },
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
  rules: {
    required: false,
    message: ''
  }
}

export default Image
