// 让下面的代码成立, 不希望改动这行代码
// var [a, b] = { a: 1, b: 2 }


/* 解构, 要求=右边是可迭代对象就行
String、Array、TypedArray、Map 和 Set 都是内置可迭代对象，因为它们的原型对象都拥有一个 Symbol.iterator 方法。
解构的本质是迭代器的next().value赋值给对应的变量 */


/* 满足可迭代协议
对象有一个Symbol.iterator属性, 是个函数, 无参, 返回一个迭代器 */
// {
//   [Symbol.iterator]: function() {
//     return 迭代器
//   }
// }


// /* 最简单实现, 直接添加Symbol.iterator方法, 返回迭代器
// 这里arr是写死的 */
// var [a, b] = {
//   a: 1,
//   b: 2,
//   [Symbol.iterator]() {
//     const arr = [1, 2]
//     return arr[Symbol.iterator]()
//   }
// }


// /* 不写死 */
// var [a, b] = {
//   a: 1,
//   b: 2,
//   [Symbol.iterator]() {
//     const arr = Object.values(this)
//     return arr[Symbol.iterator]()
//   }
// }


// /* 符合题目要求 */
// Object.prototype[Symbol.iterator] = function () {
//   const arr = Object.values(this)
//   return arr[Symbol.iterator]()
// }


// /* 简化写法 */
// Object.prototype[Symbol.iterator] = function () {
//   return Object.values(this)[Symbol.iterator]()
// }


// /* ES6最简装比写法 */
// Object.prototype[Symbol.iterator] = function* () {
//   return yield* Object.values(this)
// }


// var [a, b] = { a: 1, b: 2 }
// console.log(
//   a, b
// )