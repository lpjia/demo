import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';

export default defineConfig({
  input: 'src3/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    json()
  ]
});