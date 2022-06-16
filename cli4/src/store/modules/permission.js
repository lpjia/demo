// import { asyncRoutes, constantRoutes } from '@/router'
import { constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_routes(state, routes) {
    state.routes = constantRoutes
    console.log(routes)
  },
  // => 写法
  SET_routes_2: (state, routes) => {
    state.routes = constantRoutes
    console.log(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    commit('SET_routes', null)
    console.log(roles)
  },
  // => 写法
  generateRoutes_2: ({ commit }, roles) => {
    return new Promise((resolve) => {
      commit('SET_routes_2', null)
      console.log(roles)
      // 这里没东西出来, 当然在添加路由那就是空
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
