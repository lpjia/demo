import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
import router from './router'

import '@/assets/fonts/iconfont.css'

createApp(App)
  .use(router)
  .mount('#app')
