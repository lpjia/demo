import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',

        /* 其他静态资源分类存放, 细腻控制, 通过回调函数 */
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }
          if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].some(ext => assetInfo.name.endsWith(ext))) {
            return 'img/[name]-[hash][extname]'
          }

          /* 其他资源（字体、视频等） */
          return 'assets/[name]-[hash][extname]'
        },

        /* 手动分包, 把第三方库单独分包 */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'lib'
          }
        }

      }
    }
  }
})
