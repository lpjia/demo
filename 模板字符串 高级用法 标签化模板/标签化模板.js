const user = {
  name: 'yuan',
  age: 28,
}

function tagname(...args) { // 使用剩余参数
  console.log(args)
  /* 第一项是个数组, 由${}切割开的字符串组成, 类似split方法, 数组项可能有空字符串
  从第二项开始, 依次是${}的值 */

  return tagname // 返回自身可实现链式调用
}

/* 在模板字符串前面加一个标签名
其实本质上是在调用函数

得先定义函数, 否则报错 */
const hi = tagname`My name is ${user.name}, I'm ${user.age} years old`
  /* 链式调用 */
  `123${user.age}`
  `${user.name}456`

console.log(hi)