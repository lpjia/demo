import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import HomeVue from '@/view/Home.vue'
// import QueryVue from '@/view/Query.vue'

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
      component: () => import('@/view/Home.vue')
    },
    {
      name: 'cha_xun',
      path: '/query',
      component: () => import('@/view/Query.vue')
    },
    // {
    //   name: '401',
    //   path: '/401',
    //   component: () => import('@/view/error/401.vue')
    // },
    // {
    //   name: '404',
    //   path: '/404',
    //   component: () => import('@/view/error/404.vue')
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/404'
    // }
  ]
})

export default router