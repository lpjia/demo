// 默认sessionStorage 存 取 删 删所有
export const setStorage = (key, val, storage = window.sessionStorage) => {
  if (!key) return;
  storage.setItem(key, JSON.stringify(val))
}
export const getStorage = (key, storage = window.sessionStorage) => {
  if (!key) return;
  return JSON.parse(storage.getItem(key))
}
export const removeStorage = (key, storage = window.sessionStorage) => {
  if (!key) return;
  storage.removeItem(key)
}
export const clearStorage = (storage = window.sessionStorage) => storage.clear()