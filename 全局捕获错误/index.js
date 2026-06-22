window.addEventListener('error', (e) => {
  console.error('全局捕获同步错误:', e.message)
})
window.addEventListener('unhandledrejection', (e) => {
  console.error('全局捕获 未处理的promise拒绝:', e.message)
})

function fn() {
  // let a = null
  // if (Math.random() < 0.5) {
  //   a = {
  //     name: 'aaa'
  //   }
  // }
  // console.log(a.name)

  const b = Promise.reject(new Error('promise异步错误'))

  // b.catch((err) => {
  //   console.log(err)
  // })
}
fn()