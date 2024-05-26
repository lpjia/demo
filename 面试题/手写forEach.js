/* 根据262 */
Array.prototype.myForEach = function (callback) {
  const len = this.length
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not a function')
  }
  let k = 0
  while (k < len) {
    const pk = String(k)
    if (pk in this) {
      const kValue = this[pk]
      callback.call(this, kValue, k, this)
    }
    k++
  }
  return;
}



/* 本来以为是 死循环? */
/* let arr = [10, 20, 30]
arr.forEach((item, i) => {
  arr.push(100)
  console.log('item:', item)
})
console.log('arr:', arr) */



/* 本来以为是 循环得有3次吧? */
/* let arr = [10, 20, 30]
arr.forEach((item, i) => {
  arr.splice(i, 1)
  console.log('item:', item)
})
console.log('arr:', arr) */



/* 本来以为是 稀疏数组得循环吧? */
/* let arr = [, , 30]
arr.forEach((item, i) => {
  console.log('item:', item)
})
console.log('arr:', arr) */