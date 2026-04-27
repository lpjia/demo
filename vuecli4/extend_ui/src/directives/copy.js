import Vue from 'vue'

function fn(el, binding) {
  // 这可能会引起效率问题, 毕竟每个按钮都注册了事件, 但是事件委托在这又用不了
  el.addEventListener('click', bi_bao(binding.value, el))
}

function update(el, binding) {
  el.removeEventListener('click', bi_bao(binding.value, el))
  el.addEventListener('click', bi_bao(binding.value, el))
}

/* 弹出popper来提示 */
// async function copyByClick(txt) {
//   await navigator.clipboard.writeText(txt)
//   Vue.prototype.$notify({
//     title: '已复制',
//     type: 'success',
//     duration: 1000
//   });
// }

// function bi_bao(txt) {
//   return async () => {
//     await copyByClick(txt)
//   }
// }

/* 改变按钮文本来提示 */
async function copyByClick(txt, el) {
  await navigator.clipboard.writeText(txt)
  const dom = el.querySelector('span')
  dom.textContent = '已复制'
  setTimeout(() => {
    dom.textContent = '复制长文本'
  }, 1000);
}

function bi_bao(txt, el) {
  return async () => {
    await copyByClick(...arguments)
  }
}

Vue.directive('copy', {
  inserted(el, binding) {
    console.log('执行 inserted')
    fn(el, binding)
  },
  update(el, binding) {
    console.log('执行 update')
    update(el, binding)
  }
})