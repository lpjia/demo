// 导入只能在模块脚本中, 模块脚本中可以写普通js
import { formatTime } from '../util/commonMethod.js'
console.log('这是模块脚本, 模块脚本总是被延迟的')

new Vue({
  el: '#app',
  data: {
    msg: 'hello world!',
  },
  computed: {
    time() {
      return new Date()
    },
    timeFormatter() {
      return formatTime(new Date(), 'Y-M-D h:m:s')
    },
    toLocaleString2() {
      return new Date().toLocaleString()
    },
  },
  methods: {
    // 反转字符串
    reverseMsg() {
      this.msg = this.msg.split('').reverse().join('')
    },
  }
})