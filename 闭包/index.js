/**
 * 函数的语言里，借助闭包，同样可以封装一个私有变量
 * 在返回的对象中，实现了一个闭包，该闭包携带了局部变量x，
 * 并且，从外部代码根本无法访问到变量x。换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。
 */
function create_counter(initial) {
  let x = initial || 0;
  return {
    inc: function () {
      x += 1;
      return x;
    }
  }
}
let c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

let c2 = create_counter(10)
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13





/**
 * 闭包还可以把多参数的函数变成单参数的函数
 * 例如要计算x的y次幂可以用Math.pow(x, y)函数, 这就是2个参
 */
function make_pow(n) {
  return function (x) {
    return Math.pow(x, n);
  }
}
let pow2 = make_pow(2)
let pow3 = make_pow(3)

pow2(5) // 25
pow3(3) // 27