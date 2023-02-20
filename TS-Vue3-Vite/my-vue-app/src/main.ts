import { createApp } from 'vue'
// import './style.css'
// import App from './components/10-App.vue'
// import App from '@/components/10-App.vue'
import App from './App.vue'
import router from '@/router'
// import { initRouter } from '@/router'

// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 波浪线提示报错

// import { setStorage, getStorage, removeStorage, clearStorage } from '@/utils/commonMethods.js'


// createApp(App).use(router).mount('#app')
const app = createApp(App)
// // 增加全局属性, 没有this.$xxx写法了, 感觉不好用
// app.config.globalProperties.$setStorage = setStorage
// app.config.globalProperties.$getStorage = getStorage
// app.config.globalProperties.$removeStorage = removeStorage
// app.config.globalProperties.$clearStorage = clearStorage

// 注意顺序
app.use(router)
// initRouter(app) // 换一种写法, 初始化路由
app.mount('#app')


// app.use(ElementPlus, {
//   locale: zhCn,
// })