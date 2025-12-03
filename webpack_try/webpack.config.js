import { resolve as pathResolve, dirname as pathDirname } from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);

export default {
  mode: 'development', // 模式
  // mode: 'production', // 模式
  entry: './src/index.js', // 入口文件路径
  output: {
    filename: 'bundle.js',
    path: pathResolve(__dirname, 'dist'), // 编译后的文件输出路径
    clean: true, // 每次构建前清空dist目录
  },
  devtool: 'source-map',
  resolve: {
    alias: { // 别名
      '@': pathResolve(__dirname, 'src')
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