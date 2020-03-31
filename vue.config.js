module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const svg = config.module.rule('svg')
    svg.uses.clear()
    svg.exclude.add(/node_modules/)
    svg
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `@import "@/assets/theme/_variables.scss";`
      }
    }
  }
}
