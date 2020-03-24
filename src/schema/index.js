const Generate = function() {
  const comps = []
  const defaults = [...arguments]
  const requireComps = require.context('@/schema', false, /\.js$/)

  for (const name of defaults) {
    requireComps.keys().forEach(fileName => {
      const m = fileName.match(/\.\/([\w-_]+)\.js/)[1]
      if (name === m) comps.push(requireComps(fileName).default)
    })
  }
  return comps
}

export default Generate
