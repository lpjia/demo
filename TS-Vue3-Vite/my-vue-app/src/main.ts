import { createApp } from 'vue'
// import './style.css'
import '@/styles/index.scss';
// import App from './components/10-App.vue'
// import App from '@/components/10-App.vue'
import App from './App.vue'
import router from '@/router'
import myPinia from './stores'
// import { initRouter } from '@/router'

// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 波浪线提示报错

// import { setStorage, getStorage, removeStorage, clearStorage } from '@/utils/commonMethods.js'

import Updater from '@/utils/Redeploy'
import { ElNotification } from 'element-plus'


// console.log(process.env.NODE_ENV)


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
app.use(myPinia)
app.mount('#app')


// app.use(ElementPlus, {
//   locale: zhCn,
// })




// // 实例化该类
// const up = new Updater({
//   timer: 3000
// })
// // 未更新通知
// up.on('no-update', () => {
//   console.log('未更新')
// })
// // 更新通知
// up.on('update', () => {
//   console.log('更新了')
// })

// // 定一个全局的更新提示变量来存, 保证单例
// // const Redeploy: unknown = 

// // class SingleNotificationInstance extends ElNotification {

// // }