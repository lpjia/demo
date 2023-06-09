const obj = {
  arr: [1, 2, 3],
  a: 4
}
obj.sub = obj
obj.arr.push(obj)

const deepClone = function (value) {
  const cache = new WeakMap(); // WeakMap不影响垃圾回收, 键必须是对象
  function _deepClone(value) {
    // 判断是不是原始值
    if (value === null || typeof value !== 'object') {
      return value
    }
    // 非原始值, 那就是引用类型
    // 从缓存中找
    if (cache.has(value)) {
      return cache.get(value)
    }
    const result = Array.isArray(value) ? [] : {}
    cache.set(value, result)
    // 遍历, 对象遍历key, 数组遍历index
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = _deepClone(value[key]);
      }
    }
    return result
  }
  return _deepClone(value)
}
const newObj = deepClone(obj)

console.log(newObj.arr !== obj.arr)
console.log(newObj.sub !== obj.sub)
console.log(newObj.arr[3] !== obj)
console.log(newObj.arr[3] === newObj)