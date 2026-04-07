const p = new Promise((resolve, reject) => {
  /* 定时器, 会挂起一段时间 */
  setTimeout(() => {
    // resolve(1)
    reject(2)
  }, 1000);
})


/* p.then(
  // (res) => {
  //   console.log('promise 完成:', res)
  // },
  123,
  (err) => {
    console.log('promise 失败:', err)
  }
) */


/* // then方法 链式调用
p.then(
  123,
  (err) => {
    console.log('promise 失败:', err)
  }
).then(
  (data) => {
    console.log('ok:', data)
    return '返回了值' // return 有值, 则会传递给后面
  },
  (err) => {
    console.log('promise 失败 2:', err)
  }
).then(
  (data) => {
    console.log('ok 3:', data)
  },
  (err) => {
    console.log('promise 失败 3:', err)
  }
).then(
  (data) => {
    console.log('ok 4:', data)
  },
  (err) => {
    console.log('promise 失败 4:', err)
  }
)
console.log(p) */


/* p.then(
  123, // 传的不是函数, 则会 值穿透, .then方法实际上忽略了123, 把上一个 Promise 的结果原封不动地传递
  (err) => {
    console.log('promise 失败:', err)
    return 456 // 在 .then 或 .catch 的回调函数中, 返回（return）了一个值, 后续链条就会"完成"
    // throw 111
  }
).then(
  (data) => {
    console.log('ok:', data)
  },
  (err) => {
    console.log('promise 失败2:', err)
  }
)
console.log(p) */


const p2 = p.then(
  123, // 传的不是函数, 则会 值穿透, .then方法实际上忽略了123, 把上一个 Promise 的结果原封不动地传递
  (err) => { // p的reject结果传递到这
    console.log('promise 失败:', err)
    return 456 // 在 .then 或 .catch 的回调函数中, 返回（return）了一个值, 新 Promise 就会变成 fulfilled, 也就是p2
    // throw 111
  }
)
p2.then(
  (data) => {
    console.log('ok:', data)
  },
  (err) => {
    console.log('promise 失败2:', err)
  }
)
console.log(p)
console.log(p2)