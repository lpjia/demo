/* Promise.all() 静态方法接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。
当输入的所有 Promise 都满足条件时（包括传入空可迭代对象的情况），返回的 Promise 对象会完成，并返回一个包含所有已完成 Promise 的数组。(数组项的顺序是要依照传入的顺序而不是完成先后的顺序)
当输入的任何 Promise 被拒绝时，返回的 Promise 对象会拒绝，并返回第一个被拒绝的原因。
占位 */

/* 手写 Promise.all */
Promise.myAll = function (ps) {
  let res, rej;
  /* 把resolve和reject提出来
  暂时决定不了promise它的状态, 先保存出去
  避免过多嵌套层级 */
  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  /* 参ps必须是可迭代对象 */
  let i = 0
  const result = []
  for (const p of ps) {
    const index = i
    i++
    /* 包装成promise, Promise.resolve()
    promise的状态一旦确定了, 无法被更改
    then方法是异步的 */
    Promise.resolve(p).then((data) => {
      // 1. 将完成的数据加入到最终结果, 要依照传入的顺序而不是完成先后的顺序
      result[index] = data;
      // 2. 判断是不是全部完成
      i--; // 当运行then方法的一参回调, 循环早就结束了, i也就是最大值了
      if (i === 0) { // 全部完成
        res(result) // 把结果给出来
      }
    }, rej)
  }
  if (i === 0) {
    res([])
  }
  return promise
}