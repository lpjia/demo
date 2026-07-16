function fetchData() {
  if (Math.random() < 0.5) {
    throw new Error("同步错误 lpj");
  }
  return Promise.resolve('数据')
}


/* promise无法捕获同步错误
同步错误可以用try catch来捕获 */


/* fetchData().then((data) => {
  console.log('成功:', data)
})
  .catch((err) => {
    console.error('失败:', err)
  }) */


/* try {
  fetchData().then((data) => {
    console.log('成功:', data)
  })
    .catch((err) => {
      console.error('失败:', err)
    })
}
catch (err) {
  console.error('失败:', err)
} */


/* 同步错误和异步错误, 统一在这处理 */
Promise.try(fetchData)
  .then((data) => {
    console.log('成功:', data)
  })
  .catch((err) => {
    console.error('失败:', err)
  })

/* Promise.try
node@23才支持
在最新的edge控制台运行这段代码 */