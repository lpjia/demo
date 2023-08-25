let arr = [1, 2]


/* 解构的简洁写法 */
// const [a, b] = arr


/* 解构的本质
arr[Symbol.iterator]() 这就是迭代器, 是个对象 */
let iter = arr[Symbol.iterator]()
const a = iter.next().value
const b = iter.next().value


console.log(
  a, b
)