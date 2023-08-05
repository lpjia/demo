
/* 从函数外部获取 */
function fn1() { }
console.log(fn1.name)


const fn2 = function () { }
console.log(fn2.name)


const fn3 = () => { }
console.log(fn3.name)


// 避免这种写法
const fn4 = function fn4_() { }
console.log(fn4.name)






/* 从函数内部获取 */
function fn5() {
  console.log(typeof arguments.callee)
  console.log(arguments.callee.name)
}
fn5()