// const url = "http://127.0.0.1:8802/api/getUserInfo"
const url = "http://rap2api.taobao.org/app/mock/288967/api/random"

function getUser() {
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


/* 方法劫持 */
function run(func) {
  // 1.保存旧的fetch
  const oldFetch = globalThis.fetch
  // 2.重写fetch
  function newFetch(...args) { }
  globalThis.fetch = newFetch
  // 3.执行函数
  func()
  // 4.恢复fetch
  globalThis.fetch = oldFetch
}

// run方法来启动main函数
run(main)