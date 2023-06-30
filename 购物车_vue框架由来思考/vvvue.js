// 观察某个对象的所有属性
function observe(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let internalValue = obj[key]
      // let funcs = [] // 有可能收集多次同一个函数, 导致调用多次
      let funcs = new Set()
      Object.defineProperty(obj, key, {
        get() {
          console.log(`读取 ${key}`)
          // 依赖收集, 记录: 是哪个函数在用我
          if (window.__func) {
            funcs.add(window.__func)
          }
          return internalValue
        },
        set(val) {
          console.log(`给 ${key} 赋值`)
          internalValue = val
          // 自动调用依赖该属性的函数, 到底是哪些函数?
          // 派发更新, 运行: 执行用我的函数
          for (const fn of funcs) {
            fn()
          }
        }
      })
    }
  }
}

function autoRun(fn) {
  window.__func = fn
  fn()
  window.__func = null
}