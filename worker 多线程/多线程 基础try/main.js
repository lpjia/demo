/* js全局是 window */
console.log(
  globalThis === window,
  this === window,
  window
)

let a = 111
  , b = 222
  , c = {
    a,
    b
  };

/* 创建实例 */
let worker = new Worker("./worker.js")
let worker2 = new Worker("./worker2.js")
console.log('worker:', worker)
console.log('worker2:', worker2)

/* 给worker线程发送数据 */
// worker.postMessage({a:a,b:b})
worker.postMessage(c)
worker2.postMessage([a, b])

/* 事件监听, 接收worker线程发过来的数据 */
worker.onmessage = (e) => {
  console.log('主线程 e.data:', e.data) // e.data是worker线程传过来的数据
}
worker2.onmessage = (e) => {
  console.log('主线程 e.data:', e.data)
}

console.log('---- 分割线 ----\n\n\n')