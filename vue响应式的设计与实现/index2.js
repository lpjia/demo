import { effect } from "./effect.js"
import { reactive } from "./reactive.js"

const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn() {
  console.log('fn')
  state.a++
}
let hadRun = false
const effectFn = effect(fn, {
  lazy: true,
  // 调度器, 由用户自己决定执行什么
  // 转而会去调用 scheduler 调度器方法, 而不会调用 const effectFn 方法
  scheduler: (eff) => { // eff 就是 effectFn
    console.log('scheduler')
    Promise.resolve().then(() => {
      if (!hadRun) {
        hadRun = true
        eff()
      }
    })
    // eff()
  }
})
effectFn()
// effectFn()
// effectFn()
state.a++
state.a++
state.a++
state.a++
state.a++