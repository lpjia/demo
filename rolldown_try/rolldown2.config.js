import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.umd.js',
    format: 'umd',          // 通用模块定义
    name: 'MyBundle'        // 浏览器加载后生成的全局变量名
  }
});