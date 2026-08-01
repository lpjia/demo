import Vue from 'vue'
import App from './App.vue'

import 'xe-utils'
import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VxeUIBase)
Vue.use(VXETable)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
