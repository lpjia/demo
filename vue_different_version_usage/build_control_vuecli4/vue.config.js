module.exports = {
  productionSourceMap: false,
  // 合并配置用chainWebpack属性
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      chunks: 'all',
      // minSize: 20kb, 低于则不生成chunk
      cacheGroups: {
        vue: {
          name: 'chunk-vue', // 打包后的文件名
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          priority: 20, // 优先级
          reuseExistingChunk: true  // 如果模块已经被打包，则直接复用，避免重复
        },
        /* ramda: {
          name: 'chunk-ramda',
          test: /[\\/]node_modules[\\/]ramda[\\/]/,
          priority: 18,
          enforce: true, // 强制分包，忽略 minSize / minChunks
          reuseExistingChunk: true
        }, */
        vendors: {
          name: 'chunk-vendors-other',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    })
  }
}