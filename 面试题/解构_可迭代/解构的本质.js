let arr = [1, 2]


/* 解构的简洁写法 */
// const [a, b] = arr


/* 解构的本质
arr[Symbol.iterator]() 返回一个迭代器, 是个对象
含有 next方法的一个对象 { next(){}, ... }
调用next方法返回 { value: xxx, done: T/F } */
let iter = arr[Symbol.iterator]()
const a = iter.next().value
const b = iter.next().value


console.log(
  a, b
)