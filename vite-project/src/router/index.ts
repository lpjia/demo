import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'one',
    // component: () => import('@/views/one/one-page.vue')
    // component: () => import('@/views/compare-setup/index.vue')
    component: () => import('@/views/official-example/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router