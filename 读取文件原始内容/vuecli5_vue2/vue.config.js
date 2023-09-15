const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.dataurl$/,
          loader: 'raw-loader'
        }
      ]
    }
  }
})
