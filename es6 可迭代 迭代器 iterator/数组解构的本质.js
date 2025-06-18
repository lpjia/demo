
/* 数组解构
要求=右边是可迭代对象就行

String、Array、TypedArray、Map 和 Set 都是内置可迭代对象，因为它们的原型对象都拥有一个 Symbol.iterator 方法。

Array.prototype[Symbol.iterator]()
TypedArray.prototype[Symbol.iterator]()
String.prototype[Symbol.iterator]()
Map.prototype[Symbol.iterator]()
Set.prototype[Symbol.iterator]()

满足可迭代协议
对象有一个Symbol.iterator属性, 是个函数, 无参, 返回一个迭代器
{
  [Symbol.iterator]: function() {
    return 迭代器
  }
}

占位 */



/* 数组解构的本质是迭代器的next().value赋值给对应的变量

arr[Symbol.iterator]() 返回迭代器
迭代器是有 next方法的一个对象 { next(){}, ... }
调用next方法返回 { value: xxx, done: T/F } */
let arr = [1, 2]
let iter = arr[Symbol.iterator]()
const aObj = iter.next()
const a = aObj.value
const bObj = iter.next()
const b = bObj.value
const cObj = iter.next() // 再调用next方法就返回 {value: undefined, done: true}

console.log(a, b) // 1 2
console.log(aObj) // { value: 1, done: false }
console.log(bObj) // { value: 2, done: false }
console.log(cObj) // { value: undefined, done: true }