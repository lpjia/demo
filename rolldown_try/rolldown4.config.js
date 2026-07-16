import { defineConfig } from 'rolldown';

const outputs = [
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
]
  .map(o => ({ ...o, minify: true })); // 全部加上 minify: true

export default defineConfig({
  // input: 'src2/index.js',
  input: 'src2/index2.js',
  output: outputs
});