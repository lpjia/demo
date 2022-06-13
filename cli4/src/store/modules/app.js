// const customSetting = require('@/configs/setting.js')
import customSetting from '@/configs/setting.js'
// 两种写法都行, 因为 vue 会自动编译为 CJM

const state = {
  sidebarLogoTxtColor_2: customSetting.sidebarLogoTxtColor // 二
}

// const getters = {
//   sidebarLogoTxtColor: () => customSetting.sidebarLogoTxtColor
// }

const mutations = {
  // set_token(state, data) {
  //   state.varA = data
  // }
}

const actions = {
  // setToken({ commit }, token) {
  //   commit('set_token', token)
  // }
}


export default {
  namespaced: true,
  state,
  // getters,
  mutations,
  actions
}