// /* CommonJS 文件代码本质上是函数环境, arguments函数特有 */
// console.log(arguments)
// console.log(arguments.length)


// /* exports非全局对象, 而来自于函数的参数 */
// console.log(globalThis.exports)
// console.log(arguments[0] === exports)
// console.log(arguments[1] === require) // require也来自参数
// console.log(arguments[2] === module) // module也来自参数
// console.log(arguments[3] === __filename) // __filename也来自参数
// console.log(arguments[4] === __dirname) // __dirname也来自参数


/* 运行的时候, 把this指向exports */
console.log(this === exports) // 一开始是个空对象 {}
console.log(exports === module.exports)


/* this, exports, module.exports */



/* 整个模块返回 module.exports 的值 */