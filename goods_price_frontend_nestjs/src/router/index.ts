import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeVue from '@/view/Home.vue'
import QueryVue from '@/view/Query.vue'

/* 创建路由器 */
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'zhu_ye',
      path: '/home',
      component: HomeVue
    },
    {
      name: 'cha_xun',
      path: '/query',
      component: QueryVue
    },
  ]
})

export default router