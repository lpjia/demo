import { createApp } from 'vue'
import App from './App.vue'

export const app = createApp(App)
app.config.globalProperties.$log = '$log'
app.mount('#app')
