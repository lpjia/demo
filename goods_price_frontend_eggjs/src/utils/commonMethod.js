
// 默认sessionStorage 存 取 删 删所有
export const setStorage = (key, val, storage = window.sessionStorage) => {
  if (!key) return;
  storage.setItem(key, JSON.stringify(val))
}
export const getStorage = (key, storage = window.sessionStorage) => {
  if (!key) return;
  const item = storage.getItem(key)
  return item ? JSON.parse(item) : null
}
export const removeStorage = (key, storage = window.sessionStorage) => {
  if (!key) return;
  storage.removeItem(key)
}
export const clearStorage = (storage = window.sessionStorage) => {
  storage.clear()
}

export function arrToObj(arr, { kField = 'value', vField = 'name' } = {}) {
  const obj = arr.reduce(
    (acc, cur) => {
      acc[cur[kField]] = cur[vField]
      return acc
    },
    {}
  )
  return obj
}