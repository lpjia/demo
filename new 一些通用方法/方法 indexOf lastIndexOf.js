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



/* arr.indexOf()
indexOf(searchElement: T, fromIndex?: number): number;
一参是要查的数组的项, 二参(可选)是从某索引开始查
搜索顺序是从左到右

返回索引
返回给定元素在数组中可以找到的第一个索引，如果不存在则返回 -1 */

/* indexOf和lastIndexOf适合查简单数据类型组成的数组, 方便判断=== */

const arr3 = [0, 1, false, null, '1', 2, undefined, 3, 5, NaN, '', 8]
console.log(
  arr3.indexOf(2),
  arr3.lastIndexOf(false)
)

/* arr.lastIndexOf()
lastIndexOf(searchElement: T, fromIndex?: number): number;
一参是要查的数组的项, 二参(可选)是从某索引开始查
搜索顺序是从左到右

返回索引
返回给定元素在数组中可以找到的最后一个索引，如果该元素不存在则返回 -1 */