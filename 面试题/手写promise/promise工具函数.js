function _isPromiseLike(value) {
  return value && typeof value.then === 'function' // 简单版
}

function _runMicroTask(fn) {
  if (process && typeof process.nextTick === 'function') {
    /* node process.nextTick */
    process.nextTick(fn)
  }
  else if (typeof MutationObserver === 'function') {
    /* 浏览器 MutationObserver */
    const ob = new MutationObserver(fn)
    const text = document.createTextNode('1') // 创建一个文本节点
    ob.observe(text)
    text.data = '2'
  }
  else {
    /* 很旧的浏览器 */
    setTimeout(fn) // setTimeout 二参是延时时长, 不传默认为0
  }
}