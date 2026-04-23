module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:7010',
        changOrigin: true,
        // // pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
        // //   '^/api': ''
        // // }
        // pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
        //   '^/api': ''
        // }
      },
    }
  },
  lintOnSave: false   //关闭eslint检查
}