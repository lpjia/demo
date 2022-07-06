import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // 重置样式

// import '@/assets/fonts/iconfont.css' // 引入图标


// 全部加载
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// // 按需加载
// import {
//   Button, Input, Form,
//   FormItem, Select, Option,
//   Message, Table, TableColumn,
//   Main, Header, Footer
// } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Select);
// Vue.use(Main);
// Vue.use(Header);
// Vue.use(Footer);
// Vue.use(Option);
// Vue.use(Message); // 不要这样用, 会默认弹
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.prototype.$message = Message;


// 表格组件
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)


// 全局引入 中文包
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')


import './components' // 注册全局组件

import './icons' // 图标

import './permission' // 权限

import './directives/vColor.js' // 自定义指令


// import '@/assets/css/tailwind.css'; // tailwindcss

import '@/styles/index.scss' // global css


Vue.prototype.$bus = new Vue()


Vue.config.productionTip = false

// Vue.config.warnHandler = (msg, vm, trace) => {
//   console.log('msg:', msg)
//   console.log('vm:', vm)
//   console.log('trace:', trace)
// }

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
