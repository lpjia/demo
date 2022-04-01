/**
 * apply
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 * 接受的是一个参数数组
 * 常用于把参数数组按顺序拆开成参数传入方法中
 */
let lib = {
  doA() {
    console.log('doA()')
  },

  doB() {
    console.log('doB()')
    this.doA()
  }
}

// 当 lib.doA 方法内部不依赖 this 时, 第一个参传什么无所谓
lib.doA.apply(lib, [])
lib.doA.apply(window, [])
lib.doA.apply(null, [])
console.log('---- 分割线 ----\n\n\n')


// 当 lib.doB 方法内部依赖某东西, 第一个参得传对
lib.doB.apply(lib, [])
// lib.doB.apply(window, []) // 报错
// lib.doB.apply(null, []) // 报错