// const url = "http://127.0.0.1:8802/api/getUserInfo"
const url = "http://rap2api.taobao.org/app/mock/288967/api/random"

function getUser() {
  debugger
  return fetch(url)
}
function m1() {
  // other works
  return getUser()
}
function m2() {
  // other works
  return m1()
}
function m3() {
  // other works
  return m2()
}
function main() {
  console.log('main')
  // other works
  const user = m3()
  console.log(user)
}



function run(func) {
  // 1.保存旧的fetch
  const oldFetch = globalThis.fetch
  // 2.重写fetch
  const cache = {
    status: 'pending', // pending, fulfilled, rejected
    value: null
  }
  function newFetch(...args) {
    // 有缓存, 交付缓存
    if (cache.status === 'fulfilled') {
      return cache.value
    }
    else if (cache.status === 'rejected') {
      throw cache.value
    }
    // 无缓存
    // Ⅰ.请求
    const promise = oldFetch(args) // 细节暂时不考虑(可能多次调用fetch、
      .then(res => res.json()) // 可能不是json是其他类型数据)
      .then(data => { // 请求成功
        cache.status = 'fulfilled'
        cache.value = data
      })
      .catch(err => { // 请求失败
        cache.status = 'rejected'
        cache.value = err
      })
    // Ⅱ.抛出错误, 中断执行
    throw promise
  }
  globalThis.fetch = newFetch
  // 3.执行函数
  try {
    func()
  } catch (error) {
    if (error instanceof Promise) {
      error.finally(() => {
        globalThis.fetch = newFetch
        func()
        globalThis.fetch = oldFetch
      })
    }
  }
  // 4.恢复fetch
  globalThis.fetch = oldFetch
}

run(main)