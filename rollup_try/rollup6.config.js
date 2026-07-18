import { defineConfig } from 'rollup';
import rollupPluginMyLog from './my_plugin/index.js';

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    rollupPluginMyLog({
      message: 'Hello Rollup Plugin!'
    })
  ]
});