import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')
