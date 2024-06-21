const p = new MyPromise((resolve, reject) => {
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

/* p.then(
  123,
  (err) => {
    console.log('promise 失败:', err)
  }
).then((data) => {
  console.log('ok:', data)
}) */

p.then(
  123,
  (err) => {
    console.log('promise 失败:', err)
    return 456
  }
).then((data) => {
  console.log('ok:', data)
})