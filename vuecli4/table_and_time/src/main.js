import Vue from 'vue'
import App from './App.vue'

/* 先不管了, 先全局引入 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 按需引入 */
// import { Table, TableColumn, Divider } from 'element-ui';
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Divider);

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
/* 这里用的v3旧版本的写法, 保留, 不要动了 */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
