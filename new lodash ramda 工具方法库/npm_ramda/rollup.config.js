import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  // input: 'src/index.js',
  // output: {
  //   file: 'dist/bundle.js',
  //   format: 'es'
  // },
  // // 解析并内联 node_modules 中的 Ramda，避免生产产物继续依赖外部 ramda 包。
  // plugins: [nodeResolve()],


  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'es',
    },
  ],
  plugins: [nodeResolve()],
  treeshake: {
    moduleSideEffects: false, // 所有模块都没有顶层副作用，未使用的模块可以直接删除。
  },
};
