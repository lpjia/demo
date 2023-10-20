import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as R from 'ramda'

const arr = [
  { n: 1 },
  { n: 2 },
]
console.log(R.clone(arr))
arr[0].n++
console.log(R.clone(arr))

/* vite动态导入, 会自动分包 */
import('./about')

createApp(App).mount('#app')
