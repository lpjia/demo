import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  /* Vite 在编译 vite.config.js 时, 自动注入了 __dirname / __filename 这2个变量
    不要弄混了, 原生esmodule是没有这2个变量的
  占位 */
  root: resolve(__dirname, 'ES_module 静态导入 动态导入'),
})