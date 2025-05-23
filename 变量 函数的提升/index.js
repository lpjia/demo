/* 变量和函数都被提升到顶部 */

console.log(foo, 111)
console.log(typeof foo, 222)

function foo() {
  console.log(1)
}
var foo;


/* 看作
function foo() { console.log(1) } // 函数声明提升
var foo; // 变量声明提升（无效，因函数已存在）
console.log(foo, 111);     // 输出函数
console.log(typeof foo, 222); // 输出 "function", 没有被var foo覆盖
*/