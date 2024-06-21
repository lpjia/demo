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

/* 手写 Promise.prototype.catch */
Promise.prototype.myCatch = function (onRejected) {
  return this.then(void 0, onRejected)
}

/* 手写 Promise.resolve */
Promise.myResolve = function (value) {
  /* 如果 value 已经是 Promise 对象，则直接返回 */
  if (value instanceof Promise) return value

  /* 如果 value 是具有 then 方法的对象（thenable），则创建一个新的 Promise
  并通过 value 的 then 方法解析新的 Promise  */
  if (_isPromiseLike(value)) {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }

  /* 如果 value 是普通值，返回一个新的解析为 value 的 Promise   */
  return new Promise((resolve => resolve(value)))
}

/* 手写 Promise.reject */
Promise.myReject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}


/* 手写 Promise.all */
Promise.myAll = function (ps) {
  let res, rej;
  /* 把resolve和reject提出来, 避免过多嵌套层级 */
  const pro = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  /* 参ps必须是可迭代对象 */
  let i = 0
  const result = []
  for (const p of ps) {
    const index = i
    i++
    /* 包装成promise
    有一个拒绝, 则整个被拒绝, 返回第一个拒绝的原因
    promise的状态一旦确定了, 无法被更改 */
    Promise.resolve(p).then((data) => {
      // 1. 将完成的数据加入到最终结果, 要依照传入的顺序而不是完成先后的顺序
      result[index] = data;
      // 2. 判断是不是全部完成
      i--; // 当运行then方法的一函数回调, 循环早就结束了, i也就是最大值了
      if (i === 0) {
        res(result)
      }
    }, rej)
  }
  if (i === 0) {
    res([])
  }
  return pro
}