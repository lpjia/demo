import Vue from 'vue'
import Vuex from 'vuex'

import CreatePersistedState from "vuex-persistedstate"
import getters from './getters'

Vue.use(Vuex)

/**
 * 找同级的 modules 文件夹(第二个参: 是否包含子目录)下的所有 .js 文件(能被 require 的文件), require 可以翻译为需要
 * 直白的说就是可以通过正则匹配引入相应的文件模块
 */
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
  getters,
  modules,
  plugins: [vuexPersisted]
})

export default store