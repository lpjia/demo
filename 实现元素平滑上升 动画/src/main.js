import { createApp } from 'vue'
import App from './App.vue'
import vSlideIn from './directive/vSlideIn'

const app = createApp(App)
app.directive('slide-in', vSlideIn)

app.mount('#app')
