module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vue: {
          name: 'chunk-vue', // 打包后的文件名
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          priority: 15, // 优先级
          reuseExistingChunk: true  // 如果模块已经被打包，则直接复用，避免重复
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    })
  },
}
