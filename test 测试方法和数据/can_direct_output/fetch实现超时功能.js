/* 依靠本地服务打开html运行js */


// const controller = new AbortController()
// fetch(url, {
//   signal: controller.signal
// })
// setTimeout(() => {
//   controller.abort()
// }, 100);


/* 保持fetch的功能不变
没有侵入性
有通用性 */


// // 学习这种封装, 高阶函数
// function createFetch(timeout) {
//   return (resource, options) => {
//     return fetch(resource, options)
//   }
// }

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

// 不想使用超时, 就用原生的 fetch()

// 使用超时
// const tout = createFetch(10)
// tout(url, options)


// createFetch(1000)('http://rap2api.taobao.org/app/mock/288967/api/random').then(res => {
//   res.json().then(res2 => {
//     console.log(res2) // 拿到接口返回的data
//   })
// })


const url = 'http://rap2api.taobao.org/app/mock/288967/api/random';

// 使用异步
(async function () {
  const response = await createFetch(1000)(url)
  const res = await response.json()
  console.log(res)
})()


// 使用 then()
// 一行解决
createFetch(1000)(url).then(response => response.json().then(res => console.log(res)))
// 多行解决
createFetch(1000)(url).then(response => {
  response.json().then(res => {
    console.log(res)
  })
})