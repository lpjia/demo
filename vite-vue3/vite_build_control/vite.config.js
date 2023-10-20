import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        /* 打包后的入口文件 */
        // entryFileNames: 'js/abc.js'

        /* [name]是占位符, 表示文件的名字 */
        // entryFileNames: 'js/[name].js'

        /* [hash] 哈希占位符 */
        // entryFileNames: 'js/[name]-[hash].js',

        /* 手动分包 */
        // chunkFileNames: 'js/[name]-[hash].js',

        /* 其他静态资源分类存放 */
        // assetFileNames: '[ext]/[name]-[hash][extname]'

        /* 其他静态资源分类存放, 细腻控制, 通过回调函数 */
        // assetFileNames(assetInfo) {
        //   if (assetInfo.name.endsWith('.css')) {
        //     return 'css/[name]-[hash][extname]'
        //   }
        //   if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].some(ext => assetInfo.name.endsWith(ext))) {
        //     return 'img/[name]-[hash][extname]'
        //   }
        //   return 'assets/[name]-[hash][extname]'
        // }

        /* 手动分包, 把库文件等单独分包 */
        // manualChunks: {
        //   aaa: ['ramda', 'vue']
        // }

        /* 手动分包, 通过回调函数 */
        manualChunks(id) {
          /* id是每个模块的绝对路径 */
          // console.log('id:', id)
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
