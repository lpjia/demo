// // 让下面的代码成立, 不希望改动这行代码
// var [a, b] = { a: 1, b: 2 }


/* ES6最简装b写法 */
Object.prototype[Symbol.iterator] = function* () {
  // return yield* Object.values(this)
  yield* Object.values(this)
}
/* yield* 会迭代执行另一个可迭代对象/生成器，逐个yield其值 */


var [a, b] = { a: 1, b: 2 }
console.log(a, b)