import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout/index.vue'

Vue.use(VueRouter)


// 以后加动态路由, 简单着来
// 其实也是一个排序的模板
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
    // 该字段用来是否在侧边栏显示
    // 一般情况下, 不写该字段, 其值为 undefined, 也就是假值
    // 需要显示的菜单项肯定比隐藏的多, 隐藏的就写得少
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
    // redirect: '/computed-watch',
    redirect: '/worker',
    children: [
      {
        path: 'template-syntax',
        name: 'template-syntax',
        component: () => import('@/views/template-syntax/index.vue')
      },
      // {
      //   path: 'computed-watch',
      //   name: 'computed-watch',
      //   component: () => import('@/views/computed-watch/index.vue')
      // },
      {
        path: 'worker',
        name: 'worker',
        component: () => import('@/views/worker/index.vue')
      },
      {
        path: 'SlotRender',
        name: 'SlotRender',
        component: () => import('@/views/slot-render/index.vue')
      },
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
      {
        path: 'five/:username',
        name: 'five',
        component: () => import('@/views/five/five')
      },
      {
        path: 'five/:username/:reponame',
        name: 'six',
        component: () => import('@/views/six/six')
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


// const createRouter = new VueRouter({
//   scrollBehavior: () => ({ y: 500 }),
//   routes: constantRoutes
// })

// const createRouter = new VueRouter({
//   scrollBehavior(to, from, savedPosition) {
//     console.log('to:', to)
//     console.log('from:', from)
//     console.log('savedPosition:', savedPosition)
//   },
//   routes: constantRoutes
// })

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router