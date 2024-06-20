/* await 表达式
await 总会同步地对表达式求值并处理，处理的行为与 Promise.resolve() 一致。
若表达式的值不是 Promise，await 会把该值转换为已兑现的 Promise，然后返回其结果。
Promise.resolve(value)就是对value的包装, 满足期望返回一个promise。 */

async function m() {
  console.log(0)
  const n = await 1
  // 相当于 const n = await Promise.resolve(1)
  // 后续代码在一个事件队列里, 微队列
  console.log(n)
}

// // 上面m异步函数相当于
// function m() {
//   console.log(0)
//   return Promise.resolve(1).then(n => {
//     console.log(n)
//   })
// }

m()
console.log(2)