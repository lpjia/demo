/* 变量和函数都被提升到顶部
因为有同名的函数, 所以 var foo; 可以忽略 */
console.log(foo)
console.log(typeof foo)

function foo() {
  console.log(111)
}
var foo;


/* 看作
function foo() {
  console.log(111)
}
console.log(foo)
*/