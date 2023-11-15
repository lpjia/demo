/* 同步是真正的死循环
单线程直接啥也干不了, 光等待 */

function main() {
  console.log('main')
}
function last() {
  console.log('last')
}
function yan_chi() {
  function delay(duration) {
    var start = Date.now()
    while (Date.now() - start < duration) { }
  }
  delay(2000)
  console.log(1)
}

main()
yan_chi()
last()


/* 利用异步实现
比同步的好处是不会
例子是先死循环2秒, 后输出1 */

// async function delay(duration) {
//   return await new Promise((resolve) => setTimeout(resolve, duration))
// }
// (async () => {
//   await delay(2000)
//   console.log(1)
// })()

// last()