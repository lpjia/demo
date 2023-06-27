// 判断一个值是否为 Promise Like
function isPromiseLike(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function') && (typeof value.then === 'function')
}