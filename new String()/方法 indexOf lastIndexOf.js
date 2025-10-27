// 查找字符串, 返回索引, 索引都是按从左到右编号的 0-n

/* str.indexOf()
一参是要查的字符, 二参是从某索引开始查(可选)
从左到右查, 第一个匹配上的索引
也就是第一次出现的位置(按人的习惯从左到右)

找不到则返回-1

返回索引 */


const str2 = 'aldfsjkjdhgfksdfsdfsadgasd'
console.log(
  str2.indexOf('s') // 4

  , str2.indexOf('s', 11) // 13

  // 没找到
  , str2.indexOf('b') // -1
)
console.log('---- 分割线 ----\n\n\n')



// 字符出现的次数
function charCount(str, target) {
  let count = 0
  let i = str.indexOf(target)
  while (i > -1) {
    count++
    i = str.indexOf(target, i + 1)
  }
  return count
}
console.log(
  str2.length // 26
  , charCount(str2, 's') // 5
)
console.log('---- 分割线 ----\n\n\n')




/* str.lastIndexOf()
一参是要查的字符, 二参是从某索引开始查(可选)
从右到左查, 第一个匹配上的索引
也就是最后一次出现的位置(按人的习惯从左到右)

找不到则返回-1

返回索引 */


console.log(
  str2.lastIndexOf('s') // 24
  , str2.lastIndexOf('s', 20) // 19

  // 没找到
  , str2.indexOf('b') // -1
)
console.log('---- 分割线 ----\n\n\n')




/* 由于arr和str都是可迭代的, 所以有些方法的用法差不多, 可以一起记忆
arr.indexOf 和 arr.lastIndexOf 这两个一般不用(不好找复杂结构的数据), 不记忆 */


/* arr.findIndex()
一参是回调, 二参(可选)是执行回调时用作this的值

一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身

从左到右查, 第一个满足回调返回true的数组项的索引
也就是第一次出现的位置(按人的习惯从左到右)

找不到则返回-1

返回索引 */



/* find是找值(数组项), findIndex是找索引, 适合复杂结构的数据
值找不到返回 undefined, 索引找不到返回 -1

arr.findLastIndex()  从右到左查  也就是最后一次出现的位置
arr.find()  从左到右查  也就是第一次出现的数组项
arr.findLast()  从右到左查  也就是最后一次出现的数组项 */


const arr = [0, NaN, 1, false, null, '1', 2, undefined, 3, 5, '', 8]
const arr2 = [
  { name: 'Edward', score: 21 },
  { name: 'Zeros', score: 7 },
  { name: 'And', score: 45 },
  { name: 'Magnetic', score: 100 },
  { name: 'Sharpe', score: 97 },
  { name: 'Jack', score: 57 },
  { name: 'The', score: 82 },
]
let idx = arr2.findIndex(item => item.score >= 60) // 3
console.log(
  arr.findIndex(Boolean) // 2
  , arr2.findIndex(item => item.score >= 60) // 3
  , arr2.find(item => item.score >= 60) // { name: 'Magnetic', score: 100 }

  // 也可以根据索引[]找
  , arr2[idx] // { name: 'Magnetic', score: 100 }
)
console.log('---- 分割线 ----\n\n\n')

console.log(
  arr2.length // 7
  , arr2.findLastIndex(item => item.score < 60) // 5
  , arr2.findLast(item => item.score < 60) // { name: 'Jack', score: 57 }
)
console.log('---- 分割线 ----\n\n\n')




/* 所有都得重新总结 */



/* arr.indexOf()
一参是要查的数组的项, 二参是从某索引开始查
返回索引 */

/* indexOf和lastIndexOf适合查简单数据类型组成的数组, 方便判断=== */

const arr3 = [0, 1, false, null, '1', 2, undefined, 3, 5, NaN, '', 8]
console.log(
  arr3.indexOf(2),
  arr3.lastIndexOf(false)
)

/* arr.lastIndexOf()
一参是要查的数组的项, 二参是从某索引开始查
返回索引 */0