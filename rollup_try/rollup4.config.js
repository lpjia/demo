import { nodeResolve } from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';

export default {
  // input: 'src2/index.js',
  input: 'src2/index2.js',
  output: [
    {
      file: 'dist/bundle.es.js',
      format: 'es'
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'MyBundle'
    }
  ],
  plugins: [
    nodeResolve(), // 让 Rollup 识别并打包 node_modules 第三方依赖
    // commonjs(), // 解析 CommonJS 模块, 转 CommonJS 为 ES
    terser() // 压缩代码
  ]
};