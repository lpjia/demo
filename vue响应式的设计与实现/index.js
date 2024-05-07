import { computed } from "./computed.js";
import { effect } from "./effect.js";
import { reactive } from "./reactive.js";
import { ref } from "./ref.js";

/* const state = reactive({
  a: 1,
  b: 2,
})
function fn() {
  state.a
  // state.b
}
fn()
// state.a = 111
// state.a++ // 先读再赋值 */


/* const obj = {
  a: 1,
  b: 2,
  get c() {
    console.log('this:', this)
    // 有了Reflect的receiver参数, 才能改变this指向, 没有则this指向obj
    return this.a + this.b
  }
}
const state = reactive(obj)
function fn() {
  state.c
}
fn() */


/* const obj = {
  a: 1,
  b: 2,
  c: {
    d: 4
  }
}
const state = reactive(obj)
function fn() {
  state.c.d
}
fn() */


/* const obj = {
  a: 1,
  b: 2,
  c: {
    d: 4
  }
}
const state = reactive(obj)
function fn() {
  // 'c' in state

  // 'e' in state

  // for (const key in state) { }

  // Object.keys(state)
}
// state.e = 5
// state.a = 5
// delete state.b
// delete state.xyz
// state.a = 1
fn() */


/* const arr = [10, 20, 30]
const state = reactive(arr)
function fn() {
  // state[0]
  // state.length
  // for (let index = 0; index < state.length; index++) {
  //   state[index]
  // }
  // for (const item of state) { }
  // state.includes(20)
  // state.indexOf(10)
  // state.lastIndexOf(10)
  // state[0] = 80
  // state[5] = 80 // 隐式改变length
  // // 对length的改动其实是
  // Object.defineProperty(state, 'abc', {
  //   value: 6
  // })
  // state.length = 10
  // state.length = 1
  // console.log(arr)
}
fn() */


/* const arr = [10, 20, , ,]
const state = reactive(arr)
function fn() {
  let i = state.lastIndexOf(10)
  console.log('i:', i)
}
fn() */


/* const obj = {}
const arr = [10, obj, 30]
const state = reactive(arr)
function fn() {
  let i = state.indexOf(obj)
  console.log('i:', i)
}
fn()
console.log(state[1], arr[1]) */


/* const arr = [10, 20, 30]
const state = reactive(arr)
function fn() {
  // state.push(60)
  // state.pop()
  state.shift()
  console.log(arr)
}
fn() */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn1() {
  console.log('run')
  state.a
  state.b
  for (const key in state) { }
  function fn2() {
    state.a
  }
  fn2()
}
effect(fn1)
state.a = 10 */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn2() {
  console.log('fn2')
  state.a
  state.b
}
effect(fn2)
function fn1() {
  console.log('fn1')
  if (state.a === 1) {
    state.b
  }
  else {
    state.c
  }
}
effect(fn1)
state.a = 10 */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn() {
  console.log('fn')
  state.c
  state.a
  for (const key in state) { }
}
effect(fn)
state.c = 3 */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn() {
  console.log('fn')
  if (state.a === 1) {
    state.b
  }
  else {
    state.c
  }
}
effect(fn)
// 重新进行依赖收集, 丢掉之前所有的依赖
state.a = 10
// state.b = 20
state.c = 20 */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn() {
  console.log('fn')
  effect(() => {
    console.log('inner')
    state.a
  })
  state.b
}
effect(fn)
// state.a = 10
state.b = 20 // 渲染父组件, 会导致子组件的重新渲染 */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn() {
  console.log('fn')
  // state.a++
  // 等价于
  state.a = state.a + 1
  // state.a + 1 进行依赖收集, 派发更新时, 重新运行fn, 重新进行依赖收集
  // 无限, 栈溢出
}
effect(fn)
state.a++ */


/* const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
function fn() {
  console.log('fn')
  state.a++
}
const effectFn = effect(fn, {
  lazy: true, // 延迟执行, 手动控制什么时候执行
})
effectFn() */


/* const obj = {
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
  // 每次派发更新的时候, 转而会去调用 scheduler 调度器方法, 而不会调用 const effectFn 方法
  scheduler: (eff) => { // eff 就是 effectFn
    // console.log('scheduler')
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
state.a++ */


/* const state = ref(1)
effect(() => {
  console.log('state.value:', state.value)
})
// state.value = 1
state.value++ */


/* const state = reactive({
  a: 1,
  b: 2
})
const sum = computed(() => { // 函数
  console.log('computed')
  return state.a + state.b
})
// const sum = computed({ // 对象
//   get() {
//     console.log('computed')
//     return state.a + state.b
//   }
// })
// 读.value时计算属性才执行, 也就是延迟执行
sum.value
// 计算属性, 除了第一次读, 以后不断地读, 不需要多次运行, 只会返回缓存
sum.value
sum.value
sum.value
sum.value
console.log(sum.value)
console.log(sum.value)
console.log(sum.value)
console.log(sum.value)
console.log(sum.value)
state.a++
state.a++
state.a++
// 用的还是之前的数据?
// state.a变了, 依赖变了, 所以computed内的函数得重新运行, 重新得到新的值
console.log(sum.value)
console.log(sum.value)
console.log(sum.value)
// 计算属性, 你用到了, 我给你一个值, 没用到就不用执行函数
console.log(sum.value) */


const state = reactive({
  a: 1,
  b: 2
})
const sum = computed(() => {
  console.log('computed')
  return state.a + state.b
})
effect(() => {
  console.log('render', sum.value)
})
state.a++
state.a++