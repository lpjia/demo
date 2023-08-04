// https://zh.javascript.info/iterable


// 数组和字符串是使用最广泛的内建可迭代对象。
// 字符串可以直接遍历
let object = 'hello world'
for (const iterator of object) {
  console.log('iterator: ', iterator)
}



// 显示调用迭代器
let str = 'hello'

let iterator = str[Symbol.iterator]()

while (true) {
  let result = iterator.next()
  if (result.done) break
  console.log('result.value: ', result.value)
}