import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全部加载
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);


// 按需加载
import {
  Button, Input, Form,
  FormItem, Select, Option,
  Message, Table, TableColumn,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
// Vue.use(Message); // 不要这样用, 会默认弹
Vue.use(Table);
Vue.use(TableColumn);


Vue.prototype.$message = Message;


import '@/styles/index.scss' // global css


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
