// 把数组的项连接成字符串, 并添加分隔符

/* arr.join()
参是分隔符(可选, 默认是逗号)
返回新字符串 */

/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join */

// 数组的项仅限于简单类型
const arr = ['abc', 'def', 'ghi', 'jkl']
console.log(
  arr.join()
)
console.log(
  arr.join('_')
)
console.log(
  arr.join('')
)

console.log(
  arr.toString()
)
console.log('---- 分割线 ----\n')


// 其他基本类型试试
// null undefined '' 都转为空, '空,空,空'
const arr6 = [null, undefined, '', false, NaN, 0]
console.log(
  arr6.join()
)
console.log('---- 分割线 ----\n')


/* 复杂类型一律返回奇怪的'[object Object]'
所以复杂类型还得重新遍历转为简单类型数组再join */
const arr2 = [{}, {}, {}]
console.log(
  arr2.join()
)
console.log('---- 分割线 ----\n')


// 把对象的 name 值拼接逗号显示
const arr3 = [
  { name: 'first' },
  { name: 'second' },
  { name: 'third' },
]
// 先map, 再join
const arrStr = arr3.map(item => item.name)
console.log(
  arrStr.join()
)


// 把对象的 fileName 值去掉后缀拼接空格显示
const arr4 = [
  { fileName: 'sjghkhakg.xml' },
  { fileName: 'qwekg.txt' },
  { fileName: 'lopkij.md' },
]
const arrStr2 = arr4.map(item => {
  const name = item.fileName
  return name.substring(0, name.lastIndexOf('.'))
})
console.log(
  arrStr2.join(' ')
)


// 把对象的 declareFile 值去掉后缀拼接下划线显示
const arr5 = [
  { declareFile: 'one.d.ts' },
  { declareFile: 'two.d.ts' },
  { declareFile: 'three.d.ts' },
]
const arrStr3 = arr5.map(item => {
  const file = item.declareFile
  return file.substring(0, file.lastIndexOf('.'))
})
console.log(
  arrStr3.join()
)
console.log('---- 分割线 ----\n')