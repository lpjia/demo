import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'


import '@/styles/index.scss'




// const app = createApp(App)
// app.use(router)
//   .use(createPinia())
//   .mount('#app')

createApp(App)
  .use(router)
  .use(createPinia())
  // .directive('permission', {})
  .mount('#app')