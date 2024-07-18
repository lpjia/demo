import { createApp, DirectiveBinding } from 'vue'
// import './style.css'
// import App from './App.vue'
import App from '@/components/12-App.vue'

const app = createApp(App)

/* 应用层提供依赖, 一般常用语插件 */
app.provide('appVal', 'app value')

/* 注册全局自定义指令 */
app.directive('bgColor', {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.backgroundColor = binding.value
  }
})
/* 简化 */
// app.directive('bgColor', (el: HTMLElement, binding: DirectiveBinding) => {
//   // 这会在 `mounted` 和 `updated` 时都调用
// })


/* 注册全局组件 */
// import TabHome from "@/components/15-ChildTabHome.vue";
// import TabPosts from "@/components/15-ChildTabPosts.vue";
// import TabArchive from "@/components/15-ChildTabArchive.vue";
// app.component('TabHome', TabHome)
// app.component('TabPosts', TabPosts)
// app.component('TabArchive', TabArchive)
/* 这里注册的全局组件, 使用TabHome、TabPosts、TabArchive */


app.mount('#app')
