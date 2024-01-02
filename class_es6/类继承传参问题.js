class Video {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
}

class MyVideo extends Video {
  /* 剩余参数语法
  这样写的优点: 父类给子类传参, 一个不丢, 省事
  这三个点的语义就是“收集剩余的参数并存进指定数组(在这args是一个数组)”
  形式上是多个参变一个参 */
  constructor(...args) {
    super(...args) // 解构, ...args是解构数组语法
    // 看这3个的区别
    console.log(...args)
    console.log(args) // args是一个真正的数组
    console.log(arguments)
    /* 剩余参数和 arguments 对象之间的区别主要有三个：
    剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
    arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
    arguments对象还有一些附加的属性（如callee属性）。 */
  }
}

console.log(new Video(1, 2))


console.log('---- 分割线 ----\n')
console.log(new MyVideo(11, 22, 33))



console.log('---- 分割线 ----\n')
function tryFn(firstParam, ...args) {
  // 对应上面第1条, 剩余参数只包含那些没有对应形参的实参, firstParam是形参, 而args则不包括第一个实参
  console.log('firstParam:', firstParam)
  console.log('args:', args)
  console.log('...args:', ...args)
  console.log('arguments:', arguments)
}
tryFn(1, 2, 3, 4, 5)



console.log('---- 分割线 ----\n')
console.log(
  // 可迭代的都能展开...
  ...[11, 22, 33, 44]
)