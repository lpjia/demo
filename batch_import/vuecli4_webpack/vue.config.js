module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV !== "production" ? "source-map" : '',
  },
  lintOnSave: false   //关闭eslint检查
}