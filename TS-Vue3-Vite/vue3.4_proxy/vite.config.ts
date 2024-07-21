import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    // port: 3000, // 你的开发服务器端口  
    // host: '0.0.0.0', // 允许所有 IP 访问  
    proxy: {
      // 设置代理规则
      '/api': { // 匹配以 '/api' 开头的请求  
        target: 'http://localhost:7010', // 代理的目标地址, 这里用后台接口地址
        changeOrigin: true, // 允许跨域  
        // // rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径，去掉 '/api' 前缀
        // rewrite: (path) => path.replace(/^\/api/, ''), // 这里例子用 /api/api/test, 然后去掉第一段/api
      },
      // 可以添加更多代理规则...  
    },
  },
  /* 给别人用的, 去掉注释 */
  /* server: {
    proxy: {
      '/api': {
        target: 'http://146.56.239.184:6666',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  } */
})
