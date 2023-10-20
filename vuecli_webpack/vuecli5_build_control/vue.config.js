const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: 'disabled' // server | static | disabled
})


// /* 开发环境下才用此依赖包 */
// const plugins = []
// if (process.env.NODE_ENV === 'development') {
//   plugins.push(bundleAnalyzerPlugin);
// }


module.exports = defineConfig({
  configureWebpack: {
    // plugins: [bundleAnalyzerPlugin]

    // plugins,
  },
  productionSourceMap: false,
})


// if (process.env.NODE_ENV === 'production') {
// }
// else {
// }