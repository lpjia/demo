import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src3/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  }
});