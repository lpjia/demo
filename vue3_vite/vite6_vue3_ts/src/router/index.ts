import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home' // 重定向, 地址栏输入/, 跳转到/home
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/luYou/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/view/luYou/about.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/view/user/index.vue'),
    children: [
      {
        // path: '', // 默认匹配子路由
        path: 'profile', // 单独匹配子路由
        name: 'UserProfile',
        component: () => import('@/view/user/profile.vue'),
      },
      {
        path: 'post',
        name: 'UserPost',
        component: () => import('@/view/user/post.vue'),
      },
    ]
  },
  {
    path: '/mouseXy',
    name: 'MouseXy',
    component: () => import('@/view/luYou/mouseXy.vue')
  },
  {
    path: '/pinia',
    name: 'Pinia',
    component: () => import('@/view/pinia/index.vue')
  },
  {
    path: '/kua_yu_proxy',
    name: 'KuaYuProxy',
    component: () => import('@/view/luYou/kuaYuProxy.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router