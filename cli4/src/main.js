import Vue from 'vue'

import 'normalize.css/normalize.css' // 重置样式

// import '@/assets/fonts/iconfont.css' // 引入图标


// 全部加载
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 按需加载
// import {
//   Button, Input, Form,
//   FormItem, Select, Option,
//   Message, Table, TableColumn,
// } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Select);
// Vue.use(Option);
// // Vue.use(Message); // 不要这样用, 会默认弹
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.prototype.$message = Message;


import App from './App.vue'
import router from './router'
import store from './store'

import './icons' // 图标

import './permission' // 权限


// import '@/assets/css/tailwind.css'; // tailwindcss

import '@/styles/index.scss' // global css


Vue.prototype.$bus = new Vue()


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
