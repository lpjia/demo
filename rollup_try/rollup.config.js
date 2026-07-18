import { defineConfig } from 'rollup';

export default defineConfig({
  // 入口文件，打包的起点
  input: 'src/main.js',
  // 输出配置
  output: {
    // 输出文件路径
    file: 'dist/bundle.js',
    // 输出格式 (cjs: CommonJS, es: ES Module, iife: 浏览器)
    format: 'cjs'
  }
});