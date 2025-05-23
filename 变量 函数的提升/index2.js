/* 变量和函数都被提升到顶部
函数优先级‌：函数声明始终优先于变量声明 */

console.log(foo, 111)
console.log(typeof foo, 222)

function foo() {
  console.log(1)
}
var foo = null;
console.log(foo, 333)


/* 看作
// 提升阶段
function foo() { console.log(1) } // 函数声明优先
var foo; // 重复声明被忽略（不覆盖函数）

// 执行阶段
console.log(foo, 111);     // 输出函数
console.log(typeof foo, 222); // 输出 "function"
foo = null; // 赋值
console.log(foo, 333) // 输出null, 覆盖了函数
*/