/* 箭头函数没有自己的this
  由外层作用域的this决定
  一旦确定则无法更改, 即使 call() 、 apply() 和 bind() 方法也无法改变箭头函数的this指向
*/
/* 普通函数可以在调用时更改this指向 */

function foo() {
  return () => {
    console.log(this.aaa)
  }
}
let obj1 = {
  aaa: 2
}
let obj2 = {
  aaa: 3
}
let bar = foo.call(obj1) // 把foo函数内的this指向obj1, 调用后返回箭头函数, 箭头函数内this指向外层this, 也就是obj1, 形成了闭包
bar.call(obj2) // 想把bar函数内的this指向obj2, 但由于bar是箭头函数, this已绑定到obj1, 无法更改, 所以打印2