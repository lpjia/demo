'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const customSetting = require('./src/configs/setting')
// import customSetting from './src/configs/setting.js'
// 这里不能用 ESM 写, 因为这个文件是要运行在仅支持 CommonJS 的环境下, 只能用 CJM 语法

const title = customSetting.title || 'vuecli4'

// vue-code-location 这是我自己想到的名字
// const { vueCodeLinkServer, vueCodeLinkLoaderConfig } = require('@linzhinan/vue-code-link')


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


  // // 关闭 eslint 校验
  // lintOnSave: false,


  // 不生成 .map 文件
  productionSourceMap: false,


  chainWebpack(config) {
    // vue 文件引入 yaml 文件配置
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
      .end()

    // 配置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // // 添加vue-code-link处理器
    // vueCodeLinkLoaderConfig.addVueCodeLinkLoader(config)
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

    // // 添加监听服务
    // before: vueCodeLinkServer.before
  },

  configureWebpack: {
    devtool: 'source-map', // 调试源码
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    // plugins: [
    //   // 打包分析包大小
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'disabled'
    //   }),
    // ],
  },


  pages: {
    // 改标签页 title
    index: {
      entry: 'src/main.js',
      title
    }
  },
}