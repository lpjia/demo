import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/layout.vue'

const constanteRoutes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/three',
    children: [
      {
        path: 'one',
        name: 'one',
        component: () => import(/* webpackChunkName: "group" */ '@/views/one/one.vue')
      },
      {
        path: 'hello',
        name: 'hello',
        component: () => import(/* webpackChunkName: "group" */ '@/views/hello/hello.vue')
      },
      {
        path: 'two',
        name: 'two',
        component: () => import(/* webpackChunkName: "group" */ '@/views/two/two.vue')
      },
      {
        path: 'three',
        name: 'three',
        component: () => import(/* webpackChunkName: "group" */ '@/views/three/three.vue')
      },
    ]
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes: constanteRoutes, // routes 字段才有效, routes: routes 可以简写 routes
})

