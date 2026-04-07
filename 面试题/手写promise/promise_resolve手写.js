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