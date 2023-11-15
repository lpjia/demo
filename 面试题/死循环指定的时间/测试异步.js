/* 异步
不影响其他同步代码正常执行 */

function main() {
  console.log('main')
}
function last() {
  console.log('last')
}
main()
async function delay(duration) {
  return await new Promise((resolve) => setTimeout(resolve, duration))
}
; (async () => {
  await delay(2000)
  console.log(1)
})()
last()