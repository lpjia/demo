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
  {
    path: '/tailwind',
    name: 'tailwind',
    component: () => import('@/views/tailwind/index.vue')
  },
  {
    path: '/about', // 带参数的动态路由匹配
    name: 'about',
    component: () => import('@/views/about/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router