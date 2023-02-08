export { }

// 加了export { }, 这里就不是全局, 这里扩展的Window接口就失效了, 需要写到global.d.ts

function person(this: Window, name: string) {
  // 在ts中, 需要指明this指向, 在函数的第一个形参的位置标注
  // ts提供了Window类型, 方便window使用
  // Window类型没有topName属性, 需要自己扩展这个属性
  this.myName = name
}

// 加了export { }, 这里就不是全局, person不是window下的属性
// 手动将person挂到window下
window.person = person
window.person('a')
// person('xm') // 提示错误