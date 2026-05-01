import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleOne = {

}

const store = new Vuex.Store({
  state: {

  },
  getters: {
    token: state => state.token
  },
  modules,
  // plugins: [vuexPersisted]
})

export default store