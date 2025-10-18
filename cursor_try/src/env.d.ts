/// <reference types="vite/client" />
/// <reference types="unocss/vite" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@iconify-json/carbon' {
  const collections: any
  export default collections
} 