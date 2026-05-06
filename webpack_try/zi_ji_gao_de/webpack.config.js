import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  mode: 'development', // 模式
  // mode: 'production', // 模式
  entry: './src/index.js', // 入口文件路径
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'), // 编译后的文件输出路径
    clean: true, // 每次构建前清空dist目录
  },
  devtool: 'source-map',
  resolve: {
    alias: { // 别名
      '@': resolve(__dirname, 'src')
    },
  },
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: 'babel-loader',
    //   }
    // ]
  }
}