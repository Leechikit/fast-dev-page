/*
 * @Description:
 * @Autor: Lizijie
 * @Date: 2020-03-24 17:17:07
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-12 10:39:20
 */
import Vue from 'vue'
const install = function(name, component) {
  Vue.component(name, component)
}

// const setDefaultConfig = function(config) {
//   const defaultConfig = {
//     padding: {
//       label: '组件间距',
//       name: 'ConfigPadding',
//       value: ['0', '0', '0', '0'],
//       config: {
//         append: 'px'
//       }
//     }
//   }
//   return Object.assign({}, config, defaultConfig)
// }

const requireSchemas = require.context('@/schema', true, /[^.]\/schema.js$/)
const requireComps = require.context('@/schema', true, /[^.]\/src\/main.vue$/)

const Generate = function() {
  const comps = []
  const defaults = [...arguments]
  const requireAll = context => context.keys().map(context)
  requireAll(requireComps).forEach(item => {
    if (defaults.includes(item.default.name)) {
      install(item.default.name, item.default)
    }
  })
  requireAll(requireSchemas).forEach(item => {
    if (defaults.includes(item.default.name)) {
      // item.default.configs = setDefaultConfig(item.default.configs)
      comps.push(item.default)
    }
  })
  return comps
}

export default Generate
