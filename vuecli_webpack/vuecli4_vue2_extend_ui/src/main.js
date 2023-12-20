import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// import ElTablePatchTooltip from '@/patch/el-table-tooltip.js';
// Vue.use(ElTablePatchTooltip)

/* 又注册一遍组件, 会覆盖上面的Table组件 */
// import ElTableExtendByPlugin from '@/patch/el-table-extend-by-plugin.js';
// Vue.use(ElTableExtendByPlugin)

import ElTableExtend from '@/components/ElTableExtend.vue'
Vue.component(ElTableExtend.name, ElTableExtend)

import '@/directives/copy'

Vue.config.productionTip = false

/* 直接调用ui组件的popper */
// Vue.prototype.$notify({
//   title: '提示',
//   message: '这是一条不会自动关闭的消息',
//   duration: 1000
// });

new Vue({
  render: h => h(App),
}).$mount('#app')
