// // a是什么才能打印true
// var a = ?
// console.log(a == 1 && a == 2 && a == 3)


var obj = {}
obj = {
  // // 重写valueOf方法
  // valueOf: function () {
  //   return 1
  // }
}
/* 比较时会先调用valueOf方法, 若无法转为原始值, 再调用toString方法 */
console.log(obj.valueOf())
console.log(obj.toString())
console.log(obj == 1)
// console.log(obj == '[object Object]') // true




// var b = {
//   n: 1,
//   valueOf() {
//     return this.n++
//   }
// }
// console.log(b == 1 && b == 2 && b == 3)




// var c = {
//   n: 0,
//   valueOf() {
//     return Math.pow(2, this.n++)
//   }
// }
// console.log(c == 1 && c == 2 && c == 4)