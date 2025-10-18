import Vue from 'vue'

function fn(el, binding) {
  el.style.color = binding.value
}

/* 简写
在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子 */
Vue.directive('color', function (el, binding) {
  fn(el, binding)
})

// /* 调试执行时机 */
// Vue.directive('color', {
//   bind(el, binding) {
//     console.log('执行 bind')
//     fn(el, binding)
//   },
//   // inserted(el, binding) {
//   //   console.log('执行 inserted')
//   //   fn(el, binding)
//   // },
//   update(el, binding) {
//     console.log('执行 update')
//     fn(el, binding)
//   }
// })