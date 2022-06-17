'use strict'
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const customSetting = require('./src/configs/setting')
// import customSetting from './src/configs/setting.js'
// 这里不能用 ESM 写, 因为这个文件是要运行在仅支持 CommonJS 的环境下, 只能用 CJM 语法

const resolve = dir => path.join(__dirname, dir);
const title = customSetting.title || 'vuecli4'


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


  lintOnSave: false,


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
      // 打包分析包大小
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled'
      }),
    ],
  },


  pages: {
    // 改标签页 title
    index: {
      entry: 'src/main.js',
      title
    }
  },
}