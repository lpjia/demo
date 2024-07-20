import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia() // 创建pinia
pinia.use(
  createPersistedState({
    storage: sessionStorage,
    key: id => `__persisted__${id}`
  })
)

createApp(App)
  .use(pinia) // 安装pinia插件
  .mount('#app')
