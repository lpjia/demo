'use strict'
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const resolve = dir => path.join(__dirname, dir);


module.exports = {
  /* 
  chainWebpack: config => {
    // 查看打包文件体积大小
    config
      .plugin('webpack-bundle-analyzer')
      .use(
        new BundleAnalyzerPlugin({
          // disabled // server // static
          analyzerMode: 'static'
        })
      )
  } */


  // vue 文件引入 yaml 文件配置
  chainWebpack(config) {
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
      .end()
  },

  devServer: {
    // port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js')
    proxy: {
      "/api": {
        target: 'http://localhost:8100',
        changeOrigin: true,
        secure: false,
      }
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled'
      })
    ],
  },

}