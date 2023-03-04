// 有超时功能的fetch
function createFetch(timeout) {
  return (resource, options) => {
    let controller = new AbortController()
    options = options || {}
    options.signal = controller.signal
    setTimeout(() => {
      controller.abort()
    }, timeout);
    return fetch(resource, options)
  }
}

// const url = "http://rap2api.taobao.org/app/mock/288967/api/random"
const url = "http://localhost:8802/api/getUserInfo"
// 一个节点有异步, 这个节点上所有的调用链全都得异步, 叫异步的传染性
async function getUser() {
  return await createFetch(3000)(url).then(res => res.json())
}
async function m1() {
  // other works
  return await getUser()
}
async function m2() {
  // other works
  return await m1()
}
async function m3() {
  // other works
  return await m2()
}
async function main() {
  // other works
  const user = await m3()
  console.log(user)
}
main()
// 目标是消除异步