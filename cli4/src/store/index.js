import Vue from 'vue'
import Vuex from 'vuex'

import CreatePersistedState from "vuex-persistedstate"
// import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
// 它将自动加载模块文件中的所有 vuex 模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const vuexPersisted = new CreatePersistedState({
  key: 'VuexPersisted',
  storage: window.sessionStorage,
})

const store = new Vuex.Store({
  modules,
  plugins: [vuexPersisted]
})

export default store