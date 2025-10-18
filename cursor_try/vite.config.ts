import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          }
        }),
      ],
      shortcuts: {
        'btn': 'px-6 py-2.5 rounded-xl inline-block cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        'icon-btn': 'inline-flex items-center justify-center transition-colors cursor-pointer select-none'
      },
      theme: {
        colors: {
          primary: '#7F00FF',
          secondary: '#E100FF',
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}) 