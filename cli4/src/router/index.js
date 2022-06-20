import Vue from 'vue'
import VueRouter from 'vue-router'

// layout 不需要懒加载
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

  {
    path: '/SlotRender',
    // name: 'SlotRender', // name 可以不加, 匹配 path 就行
    component: Layout,
    redirect: '/SlotRender/index',
    meta: {
      title: '测试一级',
      icon: 'qq',
      // roles: ['admin', 'editor']    
    },
    // alwaysShow: true,
    // children: [] // 当字段存在且值为 [], 一级菜单右侧会出现箭头
    children: [
      {
        path: 'index',
        // name: 'SlotRender',
        component: () => import('@/views/slot-render/index.vue'),
        meta: {
          title: '插槽 渲染',
          icon: 'qq',
          // roles: ['admin', 'editor']    
        }
      },
    ]
  },

  // 最后加个三级路由的菜单

  {
    path: '/',
    // name: 'layout',
    component: Layout,
    redirect: '/CompNest',
    meta: {
      title: '测试', icon: 'qq',
      // roles: ['admin', 'editor']    
    },
    children: [
      {
        path: 'TemplateSyntax',
        // name: 'TemplateSyntax',
        component: () => import('@/views/template-syntax/index.vue'),
        meta: {
          title: '子菜单',
          // roles: ['admin', 'editor']
        },
      },
      // {
      //   path: 'computed-watch',
      //   name: 'computed-watch',
      //   component: () => import('@/views/computed-watch/index.vue')
      // },

      {
        path: 'CompNest',
        // name: 'CompNest',
        component: () => import('@/views/comp-nest/index.vue'),
        meta: {
          title: '子菜单二',
          // roles: ['admin', 'editor']
        },
      },
      // {
      //   path: 'one',
      //   name: 'one',
      //   component: () => import('@/views/one/one')
      // },
      // {
      //   path: 'two',
      //   name: 'two',
      //   component: () => import('@/views/two/two')
      // },
      // {
      //   path: 'three',
      //   name: 'three',
      //   component: () => import('@/views/three/three')
      // },
      // {
      //   path: 'gmap',
      //   name: 'gmap',
      //   component: () => import('@/views/gmap/gmap')
      // },
      // {
      //   path: 'four',
      //   name: 'four',
      //   component: () => import('@/views/four/four')
      // },
      // {
      //   path: 'five/:username',
      //   name: 'five',
      //   component: () => import('@/views/five/five')
      // },
      // {
      //   path: 'five/:username/:reponame',
      //   name: 'six',
      //   component: () => import('@/views/six/six')
      // },
    ]
  },


  // 404页面必须放在最后
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

  // 滚动到页面顶部
  scrollBehavior: () => ({ y: 0 }),

  // 滚动到页面底部
  // scrollBehavior: () => {
  //   let div = document.querySelector('#app');
  //   return { y: div.scrollHeight }
  // },

  routes: constantRoutes
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router