// // arguments可以打印出来, 说明这是一个函数环境
// console.log(arguments)


const two = require('./2') // 可以使用 require 方法, 说明有这个参
console.log('two:', two)


// function fn() {
//   console.log('this:', this)
// }
// // fn() // this指向global
// fn.call(exports) // 把this绑定到exports


console.log('另一个模块 this:', this)
console.log(
  this === module.exports, // 有 module 参
  this === exports // 有 exports 参
)
// this exports module.exports 是一个东西


console.log('__filename:', __filename) // 有 __filename 参
console.log('__dirname:', __dirname) // 有 __dirname 参