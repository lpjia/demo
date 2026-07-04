/// <reference types="vite/client" />
/* /// <reference types="element-plus/global.d.ts" /> */

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}