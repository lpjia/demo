/**
 * @description 过滤掉对象为空值的字段(不过滤 0 和 false)
 * @param {object} obj
 * @return {object}
 */
export function removeObjEmptyKey(obj) {
  for (let item in obj) {
    if (!obj[item]) {
      let type = typeof (obj[item])
      switch (type) {
        case 'number':
          Number.isNaN(obj[item]) && delete obj[item];
          break;
        case 'boolean':
          break;
        default:
          delete obj[item]
      }
    }
  }
  return obj
}


// 默认sessionStorage 存 取 删 删所有
export const setStorage = (key, val, storage = sessionStorage) => {
  if (!key) return;
  storage.setItem(key, JSON.stringify(val))
}
export const getStorage = (key, storage = sessionStorage) => {
  if (!key) return;
  return JSON.parse(storage.getItem(key))
}
export const removeStorage = (key, storage = sessionStorage) => {
  if (!key) return;
  storage.removeItem(key)
}
export const clearStorage = (storage = sessionStorage) => storage.clear()


// 对象转对象数组
export function objToArr(obj, { l = 'name', v = 'id', isNum = false } = {}) {
  let aKey = Object.keys(obj)
    , aResult = []
  aKey.map(item => {
    let model = {
      [l]: obj[item],
      [v]: isNum ? Number(item) : item
    }
    aResult.push(model)
  })
  return aResult
}