function concurrencyRequest(urls, maxNum) {
  if (urls.length === 0) {
    return Promise.resolve([])
  }
  return new Promise((resolve) => {
    const result = []
    let nextIndex = 0 // 下一个请求的索引
    let finishCount = 0 // 完成的请求数量

    // 发送下一个请求, 并将请求结果保存到result
    async function _request() {
      // 越界了, 不发送
      if (nextIndex >= urls.length) {
        return;
      }
      let i = nextIndex
      const url = urls[nextIndex++] // 先拿url再+1拿下一个url
      const resp = await fetch(url)
      result[i] = resp // 按请求的顺序存响应结果
      finishCount++
      if (finishCount == urls.length) {
        resolve(result)
        return;
      }
      _request() // 发送下一个请求, 补位
    }

    // 并发多少, 有可能urls长度比 maxNum 小
    const num = Math.min(maxNum, urls.length)
    for (let i = 0; i < num; i++) {
      _request()
    }
  })
}
