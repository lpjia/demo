module.exports = {
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
}