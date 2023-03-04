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



export function validEmail(email) {
  const reg = /^\w+@\w+\.\w+$/i
  return reg.test(email)
}
export function validMobilePhone(mobilePhone) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(mobilePhone)
}


export function oneToTree(list, { pKey = 'pId', cKey = 'id', gpId = 0 } = {}) {
  let len = list.length

  function loop(gpId) {
    let res = []
    for (let i = 0; i < len; i++) {
      let item = list[i]
      if (item[pKey] === gpId) {
        item.children = loop(item[cKey])
        res.push(item)
      }
    }
    return res
  }

  return loop(gpId)
}