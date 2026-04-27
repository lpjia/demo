import Vue from 'vue'

/* 关键点就是要存原来的display */
let oldDisplay = ''
function fn(el, binding) {
  oldDisplay = el.style.display
  el.style.display = !!binding.value ? oldDisplay : 'none'
}
function changeDisplay(el, binding) {
  el.style.display = !!binding.value ? oldDisplay : 'none'
}

Vue.directive('myshow', {
  bind(el, binding) {
    console.log('执行 bind')
    fn(el, binding)
  },
  /* 当绑定的值为假值, 插入dom后, display变为none, 此时不能再赋值给oldDisplay */
  // inserted(el, binding) {
  //   console.log('执行 inserted')
  //   bind(el, binding)
  // },
  update(el, binding) {
    console.log('执行 update')
    changeDisplay(el, binding)
  }
})