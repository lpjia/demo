import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'],
      directoryAsNamespace: true,
      dts: 'types/components.d.ts',
    }),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
