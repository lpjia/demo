import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/main.js',
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
  ]
});