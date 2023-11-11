import { createApp, DirectiveBinding } from 'vue'
// import './style.css'
// import App from './App.vue'
import App from './components/13-App.vue'

const app = createApp(App)


/* 全局自定义指令 */
app.directive('bgColor', {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.backgroundColor = binding.value
  }
})
/* 简化 */
// app.directive('bgColor', (el: HTMLElement, binding: DirectiveBinding) => {
//   // 这会在 `mounted` 和 `updated` 时都调用
// })


app.mount('#app')
