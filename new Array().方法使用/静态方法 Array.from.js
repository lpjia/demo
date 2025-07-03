// 把可迭代或类数组对象转成一个新数组

/* Array.from()
一参是可迭代或类数组对象, 二参是回调mapFn(可选), 三参是执行mapFn时用作this的值(可选)
二参如果提供, 则每个要添加到数组的项要过一遍mapFn, 把返回值添加到数组中
二参中的回调会被自动传入2个参数：数组元素，元素索引

返回一个新数组 */


/* 常见的类数组 → 有length属性, 可通过索引取值, 不是真数组(不可直接调用数组方法)
arguments
dom集合
字符串 */


// function f() {
//   return Array.from(arguments);
// }
// console.log(
//   f(1, 2, 3) // [ 1, 2, 3 ]
// )



let o = { // 类数组对象
  0: 'arrItem1',
  1: 'arrItem2',
  length: 2
}

console.log(
  // Array.from(o), // [ 'arrItem1', 'arrItem2' ]

  // Array.isArray(o), // false

  // [...o], // TypeError: o is not iterable
)