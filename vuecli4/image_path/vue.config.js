'use strict';
const path = require('node:path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
  },
  /* 将小于 8KiB 的资源内联，以减少 HTTP 请求的数量
  通过 chainWebpack 调整内联文件的大小限制 */
  chainWebpack: config => {
    config.module
      .rule('images')
      .set('parser', {
        dataUrlCondition: {
          maxSize: 4 * 1024 // 4KiB
        }
      })
  },
  lintOnSave: false // 关闭 eslint 检查
}