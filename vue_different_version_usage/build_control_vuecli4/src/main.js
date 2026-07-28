import Vue from 'vue'
import App from './App.vue'
import * as R from 'ramda'

const arr = [
  { n: 1 },
  { n: 2 },
]
console.log(R.clone(arr))
arr[0].n++
console.log(R.clone(arr))

import('./about.js')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
