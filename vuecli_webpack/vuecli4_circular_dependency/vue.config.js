const UnoCSS = require('@unocss/webpack').default

module.exports = {
  configureWebpack: {
    plugins: [
      UnoCSS()
    ]
  },
  chainWebpack(config) {
    config.module.rule('vue').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
    config.merge({
      cache: false,
    })
  },
  css: {
    extract: process.env.NODE_ENV === 'development'
      ? {
        filename: '[name].css',
      }
      : {
        filename: '[name].[hash:9].css',
      },
  },
  lintOnSave: false   //关闭eslint检查
}