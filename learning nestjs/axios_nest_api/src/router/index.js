import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/one'
  // },
  {
    name: 'one',
    path: '/one',
    component: () => import('@/views/one.vue')
  },
  {
    name: 'two',
    path: '/two',
    component: () => import('@/views/two.vue')
  },
  {
    path: '*',
    // redirect: '/404'
    component: () => import('@/views/error-page/404.vue')
  }
]

export default new VueRouter({ routes })