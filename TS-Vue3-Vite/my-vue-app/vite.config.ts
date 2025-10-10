import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { viteMockServe } from 'vite-plugin-mock'


export default defineConfig({
  plugins: [
    vue(),
    // 自动导入UI库的组件, 减少按需导入的写法
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: []
    }),
    // viteMockServe({
    //   logger: false,
    //   mockPath: 'mock'
    // })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.join(__dirname, 'src')
    },
  }
})