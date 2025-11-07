const url = "http://localhost:8802/api/getUserInfo"

// function main() { // main函数内只能有同步?
//   const user = fetch(url)
//   console.log(user)
// }


/* run 方法可以处理异步函数，但有一个前提:
  fetch 的调用必须在 func 执行的同步阶段发起（即使 fetch 本身返回异步结果，如 Promise）
*/
async function main() {
  const user = await fetch(url) // fetch 调用是同步发起的, 有效
  console.log(user)
}


/* // 异步且 fetch 在异步回调中发起（无效）
function main2() {
  // 事件循环, 先执行完同步代码, 再执行异步任务
  setTimeout(() => {
    const user = fetch(url); // 此时 fetch 已被恢复为 oldFetch（失效）
    console.log(user); // 输出原始 fetch 的结果（不符合预期）
  }, 0);
} */


function run(func) {
  // 1.保存旧的fetch
  const oldFetch = globalThis.fetch
  // 2.重写fetch
  function newFetch(...args) {
    return args[0]
  }
  globalThis.fetch = newFetch
  // 3.执行函数
  func()
  // 4.恢复fetch
  globalThis.fetch = oldFetch
}
// run方法来启动main函数
run(main)