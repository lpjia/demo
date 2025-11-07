/* 这种 “保存旧方法→重写→恢复” 的思路, 叫"方法劫持" */
/* 核心目的是在不修改原方法源码的前提下，对其功能进行增强、监控或替换，且通过 “恢复旧方法” 保证作用域仅局限于目标逻辑（如示例中的 func() 执行期间），避免全局污染 */


/* function run(func) {
  // 1.保存旧的fetch
  const oldFetch = globalThis.fetch
  // 2.重写fetch
  function newFetch(...args) { 
    // xxx
  }
  globalThis.fetch = newFetch
  // 3.执行函数
  func()
  // 4.恢复fetch
  globalThis.fetch = oldFetch
}

// run方法来启动main函数
run(main) */


const url = "http://localhost:8802/api/getUserInfo"

/* 需求: 在不改动fetch源码的情况下, user变量要打印出来url的值 */

function main() {
  const user = fetch(url)
  console.log(user)
}
// main()

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