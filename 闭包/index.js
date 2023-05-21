/* 函数的作用:
避免变量全局污染
数据私有化, 外部无法修改内部数据
可以让外部使用内部的私有数据 */

/* 闭包的核心作用:
使变量/数据驻留在内存中, 不被回收 */

/* 闭包使用过多会造成内存泄漏 */

function fn() {
  let count = 0
  return function () {
    count++
    console.log(count)
  }
}
let hook = fn()
hook()
hook()
hook()
hook = null // 用完闭包后手动清除闭包





/* 闭包还可以把多参数的函数变成单参数的函数
例如要计算x的y次幂可以用Math.pow(x, y)函数, 这就是2个参 */
function make_pow(n) {
  return function (x) {
    return Math.pow(x, n);
  }
}
let pow2 = make_pow(2)
let pow3 = make_pow(3)

pow2(5) // 25
pow3(3) // 27