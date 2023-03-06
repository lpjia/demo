import Vue from 'vue'

export function fn(that) {
  console.log('fn that.$log:', that.$log)
  console.log('fn that.msg:', that.msg)

  console.log('Vue.prototype.$log:', Vue.prototype.$log)

  const vm = new Vue()
  console.log('vm.$log:', vm.$log)
  console.log('vm:', vm)
}