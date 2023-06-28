/* 函数提升的优先级比var高 */
console.log(foo, 'foo1')

function foo() {
  console.log(111)
}
var foo = function () {
  console.log(222)
};

console.log(foo, 'foo2')



/* 看作
function foo() {
  console.log(111)
}
console.log(foo, 'foo1')

var foo;
foo = function () {
  console.log(222)
};
console.log(foo, 'foo2')
*/