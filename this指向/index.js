"use strict";

let obj = {
  name: 'JAY',
  sayHello: function () { // 给sayHello属性一个匿名函数
    console.log(this)
    // console.log(this.name)
  },

  // sayHello() { // 匿名函数简写
  //   console.log(this)
  //   // console.log(this.name)
  // },

  // _this: this, // this指向window

  // sayHello: () => { // 箭头函数自己没有this, 用外层的this且不改变this的指向
  //   console.log(this)
  // },

  // sayHello() { // 返回一个箭头函数
  //   return () => {
  //     console.log(this)
  //   }
  // },

  // sayHello() { // 返回一个立即执行函数
  //   return (() => {
  //     console.log(this)
  //   })()
  // },

  chuan_can: function (sex, age) {
    console.log(this, sex, age)
  }
}
let obj2 = {
  name: 'LP'
}




// obj.sayHello()

// obj.sayHello.call(globalThis)

// obj.sayHello.call(new Date())

// obj.sayHello.call('abc')

obj.sayHello.call(obj2)

// // 返回一个函数
// const fn = obj.sayHello.bind(obj2)
// console.log(fn)


// // 一般需要再加()调用一次
// obj.sayHello.bind(obj2)()

// obj.chuan_can.call(obj2, 'male', 38)


// // 一般推荐用call, 和正常函数的传参行为一致
// // 使用arguments解构
// function test_chuan_can(o, sex, age) {
//   // console.log(...arguments) // arguments是所有参数组成的类数组
//   return obj.chuan_can.call(...arguments)
//   // return obj.chuan_can.apply(arguments) // 也行
// }
// test_chuan_can(obj2, 'male', 38)


// // 使用剩余参数(最后一个命名参数以...为前缀)
// function test2_chuan_can(o, ...rest) {
//   // console.log(rest) // rest是剩余参数组成的数组
//   // console.log(...rest)
//   return obj.chuan_can.call(o, ...rest)
//   // return obj.chuan_can.apply(o, rest) // 也行
// }
// test2_chuan_can(obj2, 'male', 38)


/*
call 语法：  foo.call(this, arg1,arg2, ... ,argn ); 会直接运行foo函数
apply 语法： foo.apply(this, [ arg1,arg2, ... ,argn ] ); 会直接运行foo函数
bind 语法：  foo.bind(this);
bind 绑定后一般需要再加()调用一次才会运行foo函数
*/


// 箭头函数不改变this的指向, 箭头函数里面没有this, 箭头函数定义好后用的就是外层的this
// console.log(obj._this)

// obj.sayHello()()

// obj.sayHello.call(obj2)()