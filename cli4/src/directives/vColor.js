// 注册全局指令
import Vue from 'vue'

const fn = (el, binding) => {
  el.style.color = binding.value
}

// Vue.directive('color', {
//   bind(el, binding) {
//     fn(el, binding)
//   },
//   update(el, binding) {
//     fn(el, binding)
//   }
// })

Vue.directive('color', (el, binding) => {
  fn(el, binding)
})