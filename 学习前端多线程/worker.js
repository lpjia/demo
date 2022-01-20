onmessage = function (e) {
  const time = Math.random() * 3000
  // 模拟复杂计算
  setTimeout(() => {
    postMessage(`Second ${time.toFixed(0)} ms, ID is ${e.data.uuid}`)
  }, time)
}