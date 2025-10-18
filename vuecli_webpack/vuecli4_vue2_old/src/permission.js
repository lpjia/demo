// import router from './router'
// import store from './store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// NProgress.configure({ showSpinner: false })

// // const whiteList = ['/login', '/auth-redirect']
// // const whiteList = []

// router.beforeEach(async (to, from, next) => {
//   NProgress.start()
//   console.log('to:', to)
//   console.log('from:', from)


//   const roles = null
//   const accessRoutes = await store.dispatch('permission/generateRoutes_2', roles)
//   console.log('accessRoutes:', accessRoutes)
//   for (const iterator of accessRoutes) {
//     router.addRoute(iterator)
//   }

//   setTimeout(() => {
//     NProgress.done()
//   }, 5000);
//   // next()
//   next({ ...to, replace: true })
// })

// router.afterEach(() => {
//   NProgress.done()
// })


// store.dispatch('permission/generateRoutes_2', null)