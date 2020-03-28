import Vue from 'vue'
const install = function(name, component) {
  Vue.component(name, component)
}

const Generate = function() {
  const comps = []
  const defaults = [...arguments]
  const requireAll = context => context.keys().map(context)
  const requireSchemas = require.context('@/schema', true, /[^.]\/schema.js$/)
  const requireComps = require.context('@/schema', true, /[^.]\/src\/main.vue$/)
  requireAll(requireComps).forEach(item => {
    install(item.default.name, item.default)
  })
  requireAll(requireSchemas).forEach(item => {
    if (defaults.includes(item.default.name)) {
      comps.push(item.default)
    }
  })
  return comps
}

export default Generate
