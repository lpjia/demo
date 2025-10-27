const state = {
  showSidebarLogo: true
}

const mutations = {
  set_token(state, data) {
    state.varA = data
  }
}

const actions = {
  setToken({ commit }, token) {
    commit('set_token', token)
  }
}

const getters = {
  getters: state => state.showSidebarLogo
}

// 还能嵌套模块


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}