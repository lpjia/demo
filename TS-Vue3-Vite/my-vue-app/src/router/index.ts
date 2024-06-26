import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import Cookies from 'js-cookie'
import { useUserStore } from "@/stores/user";
import * as R from 'ramda';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 一些公共路由
const commonRoutes = [
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
    path: '/403',
    name: '403',
    component: () => import('@/views/err/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/err/404.vue')
  },
]

// 后台返回的用户路由
const userOwnRoutes = [

]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  ...commonRoutes,
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/login/register.vue')
      }
    ]
  },
  // {
  //   path: '/about/:id/title/:pname', // 带参数的动态路由匹配
  //   name: 'about',
  //   component: () => import('@/views/about/index.vue')
  // },
  // // 先不拦截路由
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404'
  // },
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})


// 清掉所有cookie和storage存的用户数据
const clearUserInfo = () => {
  Cookies.remove('token')
  localStorage.clear()
}

NProgress.configure({ showSpinner: false })

// 这样处理路由, 其实还有个问题, 就是添加path: '/:pathMatch(.*)*'后, 
// 有些不存在路由被拦截到404后, 地址栏这时候显示404路由
// 再去访问不存在的路由, 页面没有变(还是404页面), 地址栏却变为不存在的路由地址
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // const whiteList = ['/login', '/register']
  const whiteList = ['/login']
  const token = Cookies.get('token')
  const userStore = useUserStore()
  const toPath = to.path
  if (token) {
    // 有token
    if (!userStore.menus.length) {
      // 如果权限菜单没值, 重新获取用户信息
      try {
        const userData = await userStore.getUserInfo()
        if (R.isNil(userData) || R.isEmpty(userData)) {
          // 如果返回的用户信息为空, 清掉用户信息
          clearUserInfo()
          next('/login')
        }
      } catch (error) {
        // 接口报错
        clearUserInfo()
        next('/login')
      }
    }

    if (whiteList.includes(toPath)) {
      // 在白名单, 跳转到首页
      next('/home')
    } else {
      // 不在白名单, 直接跳转
      next()
    }
  } else {
    // token 不存在, 没有登录

    // // 清掉所有cookie和storage存的用户数据
    // Cookies.remove('token')
    // localStorage.clear()
    // 封装
    clearUserInfo()

    if (whiteList.includes(toPath)) {
      // 在白名单, 直接跳转
      next()
    } else {
      // 不在白名单, 跳转到登录页
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router

// // 把router相关的逻辑全封装在router/index.ts文件中, 减少耦合
// export const initRouter = (app: App) => {
//   app.use(router)
// }