// 注册全局指令
import Vue from 'vue'

const fn = (el, binding) => {
  el.style.color = binding.value
}

Vue.directive('color', {
  bind(el, binding) {
    fn(el, binding)
  },
  update(el, binding) {
    fn(el, binding)
  }
})


// 简写
// 在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子
// Vue.directive('color', (el, binding) => {
//   fn(el, binding)
// })