import Vue from 'vue'
import './style.css'
import App from './App.vue'

// import './directives/color' // 注册全局自定义指令
/* 想弄个自动化导入全部自定义指令的功能, 参考vue-element-admin的store的module导入书写
得统一格式, 不行 */
// import './directives/myshow'

// import '@/directives/byPlugin' // 通过插件的形式注册的全局自定义指令

import './directives'

// 这是常见的导入形式, 类似vuex、vue-router
import MyPlugin from './plugins/try'
Vue.use(MyPlugin)
// 模仿vue-router初始化
const myPlugin = new MyPlugin('shi_can')
console.log('myPlugin:', myPlugin)
// 模仿vuex初始化
const myPlugin2 = new MyPlugin.Xy('shi_can')
console.log('myPlugin2:', myPlugin2)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
