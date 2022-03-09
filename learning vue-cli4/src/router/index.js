import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout/layout.vue'

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
    /**
     * 该字段用来是否在侧边栏显示
     * 一般情况下, 不写该字段, 其值为 undefined
     * 需要显示的菜单项肯定比隐藏的多, 隐藏的就写得少
     */
  },



  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@/components/Home.vue')
  //   // redirect: '/one'
  // },
  {
    path: '/',
    name: 'layout',
    // component: () => import('@/layout/layout.vue'),
    component: Layout,
    // redirect: '/one'
    children: [
      {
        path: 'one',
        name: 'one',
        component: () => import('@/views/one/one')
      },
      {
        path: 'two',
        name: 'two',
        component: () => import('@/views/two/two')
      },
      {
        path: 'three',
        name: 'three',
        component: () => import('@/views/three/three')
      },
      {
        path: 'gmap',
        name: 'gmap',
        component: () => import('@/views/gmap/gmap')
      },
      {
        path: 'four',
        name: 'four',
        component: () => import('@/views/four/four')
      },
    ]
  },
  // {
  //   path: '/one',
  //   name: 'one',
  //   component: () => import('@/views/one/one')
  // },
  // {
  //   path: '/two',
  //   name: 'two',
  //   component: () => import('@/views/two/two')
  // },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})


// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default createRouter