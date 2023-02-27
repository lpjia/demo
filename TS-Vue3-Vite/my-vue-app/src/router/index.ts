import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { setStorage, getStorage } from '@/utils/commonMethods.js'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about/:id/title/:pname', // 带参数的动态路由匹配
    name: 'about',
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/err/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/err/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})

// setStorage('token', 'abc')

// 这样处理路由, 其实还有个问题, 就是添加path: '/:pathMatch(.*)*'后, 
// 有些不存在路由被拦截到404后, 地址栏这时候显示404路由
// 再去访问不存在的路由, 页面没有变(还是404页面), 地址栏却变为不存在的路由地址
// router.beforeEach((to, from, next) => {
//   const whiteList = ['/login', '/register']
//   const token = getStorage('token')
//   const toPath = to.path
//   if (token) {
//     // 在白名单, 跳转到首页
//     if (whiteList.includes(toPath)) {
//       next('/home')
//     } else {
//       next()
//     }
//   } else {
//     // token 不存在, 没有登录
//     if (whiteList.includes(toPath)) {
//       next()
//     } else {
//       // 不在白名单, 跳转到登录页
//       next('/login')
//     }
//   }
// })

export default router

// // 把router相关的逻辑全封装在router/index.ts文件中, 暂时不清楚有啥明显优势?
// export const initRouter = (app: App) => {
//   app.use(router)
// }