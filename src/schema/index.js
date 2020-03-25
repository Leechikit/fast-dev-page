import Vue from 'vue'

const install = function(name, component) {
  console.log(name)
  console.log(component)
  Vue.component(name, component)
}

const Generate = function() {
  const comps = []
  const defaults = [...arguments]
  const requireAll = context => context.keys().map(context)
  const requireComps = require.context('@/schema', true, /[^.]\/schema.js$/)
  requireComps.keys().forEach(() => {
    const importPromise = import('@/schema/fd-image/src/main.vue')
    importPromise.then(component => {
      install('FdImage', component.default)
    })
  })
  requireAll(requireComps).forEach(item => {
    if (defaults.includes(item.default.name)) {
      comps.push(item.default)
    }
  })
  return comps
}

export default Generate
