import Vue from 'vue'
import VueRouter from 'vue-router'

// layout 不需要懒加载
import Layout from '@/layout/index.vue'

import nestedRouter from './modules/nested'

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
    path: '/PatchPackage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/patch-package/index.vue'),
        name: 'PatchPackage',
        meta: {
          title: '打补丁',
          icon: 'el-icon-paperclip'
        }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://gitee.com/mirrors/vue-element-admin',
        meta: {
          title: '外链',
          icon: 'link'
        }
      }
    ]
  },

  nestedRouter,


  {
    // 考虑到计算偏移量, 简单起见, 放到一级菜单
    path: '/LearningFloat',
    component: () => import('@/views/learning-float/index.vue'),
    meta: {
      title: '浮动',
      icon: 'el-icon-toilet-paper',
    },
  },

  /* 当 lodash 示例变多就单独组一级菜单, 分各种类型
  {
    path: '/LearningLodash',
    component: Layout,
    meta: {
      title: 'lodash',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/learning-lodash/index.vue'),
        meta: { title: 'lodash', },
      }
    ]
  },
  */

  {
    path: '/',
    // name: 'layout',
    component: Layout,
    redirect: '/CompNest',
    meta: {
      title: '测试',
      icon: 'el-icon-phone',
      // roles: ['admin', 'editor']    
    },
    children: [
      {
        path: 'TemplateSyntax',
        name: 'TemplateSyntax',
        component: () => import('@/views/template-syntax/index.vue'),
        meta: {
          title: '模版语法',
          // roles: ['admin', 'editor']
        },
      },
      {
        path: 'ComputedWatch',
        // name: 'computed-watch',
        component: () => import('@/views/computed-watch/index.vue'),
        meta: { title: '计算 侦听器' },
      },
      {
        path: 'CompNest',
        // name: 'CompNest',
        component: () => import('@/views/comp-nest/index.vue'),
        meta: { title: '组件嵌套自身' },
      },
      {
        path: 'DynamicComp',
        component: () => import('@/views/dynamic-comp/index.vue'),
        meta: { title: '动态组件' },
      },
      {
        path: 'SlotRender',
        component: () => import('@/views/slot-render/index.vue'),
        meta: { title: '插槽 渲染' },
      },
      {
        path: 'LearningDayjs',
        component: () => import('@/views/learning-dayjs/index.vue'),
        meta: { title: 'dayjs' },
      },
      {
        path: 'CustomDirective',
        component: () => import('@/views/custom-directive/index.vue'),
        meta: { title: '自定义指令' },
      },
      {
        path: 'LearningLodash',
        component: () => import('@/views/learning-lodash/index.vue'),
        meta: { title: 'lodash' },
      },
      {
        path: 'EventProcessing',
        component: () => import('@/views/event-processing/index.vue'),
        meta: { title: '事件处理' },
      },
      {
        path: 'ElementPosition',
        component: () => import('@/views/element-position/index.vue'),
        meta: { title: '元素定位' },
      },
      {
        path: 'ImgPath',
        component: () => import('@/views/img-path/index.vue'),
        meta: { title: '引入图片' },
      },
      {
        path: 'LearningAnimate',
        component: () => import('@/views/learning-animate/index.vue'),
        meta: { title: '动画' },
      },
      {
        path: 'ReadYaml',
        component: () => import('@/views/read-yaml/index.vue'),
        meta: { title: '读取 yaml' },
      },
      {
        path: 'one',
        name: 'one',
        component: () => import('@/views/one/one'),
        meta: { title: 'one', },
      },
      {
        path: 'two',
        name: 'two',
        component: () => import('@/views/two/two'),
        meta: { title: 'two', }
      },
      {
        path: 'three',
        name: 'three',
        component: () => import('@/views/three/three'),
        meta: { title: 'three', }
      },
      {
        path: 'gmap',
        name: 'gmap',
        component: () => import('@/views/gmap/gmap'),
        meta: { title: 'gmap', }
      },
      {
        path: 'four',
        name: 'four',
        component: () => import('@/views/four/four'),
        meta: { title: 'four', }
      },
      {
        path: 'five/:username',
        name: 'five',
        component: () => import('@/views/five/five'),
        meta: { title: 'five', }
      },
      {
        path: 'five/:username/:reponame',
        name: 'six',
        component: () => import('@/views/six/six'),
        meta: { title: 'six', }
      },
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

  // // 滚动到页面底部
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