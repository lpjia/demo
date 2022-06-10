const state = {
  varA: 'A'
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


export default {
  namespaced: true,
  state,
  mutations,
  actions
}