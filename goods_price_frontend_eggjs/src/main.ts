import { createApp } from 'vue'
import '@unocss/reset/tailwind-compat.css'
import './style.css'
import './style/main.scss'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'

createApp(App)
  .use(router)
  .mount('#app')