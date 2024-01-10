/* a是什么才能打印true
var a = ?
console.log(a == 1 && a == 2 && a == 3) */


var obj = {}
// var obj = {
//   // 重写 valueOf 方法, valueOf方法如果不重写(对象的原型上有valueOf方法), 默认返回对象本身
//   valueOf: function () {
//     return 1
//   }
// }
/* == 比较时会先调用 valueOf 方法, 若无法转为原始值, 再调用 toString 方法
更新了知识, 看"隐式转换.md" */
console.log(obj.valueOf()) // {}
console.log(obj.toString()) // '[object Object]'
console.log(obj == 1)
// console.log(obj == '[object Object]') // true



console.log('---- 分割线 ----\n\n\n')



/* 解决 */
var b = {
  n: 1,
  valueOf() {
    return this.n++
  }
}
console.log(b == 1 && b == 2 && b == 3)

var d = {
  n: 1,
  [Symbol.toPrimitive](hint) {
    console.log('hint:', hint)
    return this.n++
  }
}
console.log(d == 1 && d == 2 && d == 3)





var c = {
  n: 0,
  valueOf() {
    return Math.pow(2, this.n++)
  }
}
console.log(c == 1 && c == 2 && c == 4)