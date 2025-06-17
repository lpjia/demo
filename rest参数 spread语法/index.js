/* rest参数 spread语法
剩余参数 展开语法

剩余参数 这三个点的语义就是“收集剩余的参数并存进指定数组中”
展开语法 只适用于可迭代对象 */



/* Rest 参数必须放到参数列表的末尾 */
function sum(a, b) {
  return a + b;
}
function sumAll(...args) { // 数组名为 args
  let sum = 0;
  for (let arg of args) {
    sum += arg;
  }
  return sum;
}

// console.log(
//   sum(1, 2, 3, 4, 5), // 3
//   sumAll(1, 2, 3), // 6
// )



function showName(firstName, lastName, ...titles) {
  console.log("firstName + ' ' + lastName: ", firstName + ' ' + lastName) // Julius Caesar

  /* 剩余的参数都被放入 titles 数组中
  titles = ["Consul", "Imperator"] */
  console.log(
    titles[0], // Consul
    titles[1], // Imperator
    titles.length, // 2
  )
}

// showName("Julius", "Caesar", "Consul", "Imperator");



/* arguments, 函数内自带, 是个关键字, 箭头函数没有
尽管 arguments 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能直接调用 arguments.map(...) 等方法。
此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取入参的一部分。 */
function showName2() {
  console.log(
    arguments.length,
    arguments[0],
    arguments[1],
  )

  // for (let arg of arguments) { // 它是可遍历的
  //   console.log(arg)
  // };
}

// 依次显示：2，Julius，Caesar
showName2("Julius", "Caesar");

// 依次显示：1，Ilya，undefined（没有第二个参数）
showName2("Ilya");





function showName3(p) { // 只声明了1个形参
  const jiantou = params => { // 箭头函数没有自己的arguments，只能用父函数的
    console.log('arguments: ', arguments) // '参数', '参数2', '参数3'
    console.log('params: ', params) // '参数'
  }
  return jiantou(p)
}
// showName3('参数', '参数2', '参数3')


// function fn() {
//   // 报错
//   const result = arguments.join('-') // arguments是个类数组, 不能直接调用数组的方法
//   console.log(result)
// }

// function fn() {
//   const result = Array.prototype.join.call(arguments, '-')
//   console.log(result) // 原型对象Array.prototype有join方法, 可将arguments作为this上下文传入, 间接调用数组方法
// }

function fn() {
  const result = [...arguments].join('-') // ...展开语法转为数组, 再调数组的方法
  console.log(result)
}
// fn('one', 'two', 'three') // 打印 one-two-three





/* Spread 语法 来帮助你了！它看起来和 rest 参数很像，也使用 ...，但是二者的用途完全相反。
当在函数调用中使用 ...arr 时，它会把可迭代对象 arr “展开”到参数列表中。

Array.from 适用于类数组对象也适用于可迭代对象。更通用!
Spread 语法只适用于可迭代对象。 */

let arr = [3, 5, 1];
// console.log(Math.max(...arr)); // 5（spread 语法把数组转换为参数列表）

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
// console.log(Math.max(...arr1, ...arr2)); // 8

// console.log(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25

let merged = [0, ...arr, 2, ...arr2];
// console.log('merged: ', merged);

let str = "Hello";
// console.log([...str]); // [H,e,l,l,o]
// console.log(Array.from(str)); // [H,e,l,l,o]


// Array.from可将类数组转为数组
let o = {
  0: 'str1',
  1: 'str2',
  length: 2
}
// console.log(Array.from(o)) // ['str1', 'str2']



let obj = {
  a: 1,
  b: 2,
  c: 3
};
// console.log(Object.assign({}, obj))

let obj2 = {
  0: 1,
  1: 2,
  2: 3
};
// console.log(Object.assign([], obj2))