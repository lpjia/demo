// import Vue from 'vue'
import phone from '@/components/phone.vue'


/* 插件通常用来为 Vue 添加全局功能
会自动执行插件的install方法 */


/* 最简单的插件实现 */
// const MyPlugin = {
//   install: function (Vue) {}
// }
// export default MyPlugin
// // Vue.use(MyPlugin)


function install(Vue) {
  // 类成员
  Vue.myGlobalMethod = function () {
    console.log('执行 myGlobalMethod')
  }

  // 实例成员
  Vue.prototype.$myMethod = function (methodOptions) {
    console.log('执行 $myMethod')
  }

  // 组件
  Vue.component('MyPluginComp', phone)
}

class MyPlugin {
  constructor(can) {
    this.can = can
  }
}

MyPlugin.install = install
MyPlugin.Xy = function (can) {
  console.log(can)
}

export default MyPlugin