/* 死循环指定的时间 */


/* 同步执行
会导致后面的同步代码延迟若干时间后再执行
例子是先死循环2秒, 后输出1 */

function delay(duration) {
  var start = Date.now()
  while (Date.now() - start < duration) { }
}
delay(2000)
console.log(1)


/* 利用异步实现
比同步的好处是不会使单线程在这段时间内啥也干不了, 光等待
例子是先循环2秒, 后输出1 */

// async function delay(duration) {
//   return await new Promise((resolve) => setTimeout(resolve, duration))
// }
// ; (async () => {
//   await delay(2000)
//   console.log(1)
// })()
// console.log('不影响其他同步代码正常执行')