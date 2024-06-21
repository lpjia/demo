/* const p = new MyPromise((resolve, reject) => {
  reject(2)
  resolve(1)
}) */

const p = new MyPromise((resolve, reject) => {
  /* 定时器, 会挂起一段时间 */
  setTimeout(() => {
    resolve(1)
  }, 1000);
})

/* then方法可以传2个函数, 第一个是处理完成后续, 第二个是处理失败后续 */
/* p.then(
  (res) => {
    console.log('promise 完成:', res)
  },
  (err) => {
    console.log('promise 失败:', err)
  }
) */

/* then方法调用多次
当promise完成后, 每个回调(一函数)都要执行, 同理失败后也要分别执行每个回调(二函数) */
p.then(
  (res) => {
    console.log('promise 完成1:', res)
  },
  // null,
  (err) => {
    console.log('promise 失败1:', err)
  }
)
p.then(
  (res) => {
    console.log('promise 完成2:', res)
  },
  // (err) => {
  //   console.log('promise 失败2:', err)
  // }
)
p.then(
  (res) => {
    console.log('promise 完成3:', res)
  },
  (err) => {
    console.log('promise 失败3:', err)
  }
)