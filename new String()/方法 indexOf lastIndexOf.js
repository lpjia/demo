// 查找字符串, 返回索引, 索引都是按从左到右编号的 0-n

/* str.indexOf()
一参是要查的字符, 二参是从某索引开始查
返回索引 */

/* 从左到右查
第一次出现的位置(从左向右也就是第一个匹配上的)的索引 */


const str = 'aldfsjkjdhgfksdfsdfsadgasd'
// 字符出现的次数
function characterOccurrenceCount(str, target) {
  let count = 0
  let i = str.indexOf(target)
  while (i > -1) {
    count++
    i = str.indexOf(target, i + 1)
  }
  return count
}
console.log(
  str.length
)
console.log(
  characterOccurrenceCount(str, 's')
)




/* str.lastIndexOf()
一参是要查的字符, 二参是从某索引开始查
返回索引 */

/* 从右到左查
最后一次出现的位置(从右向左也就是第一个匹配上的)的索引 */

console.log(
  str.lastIndexOf('s'),
  str.lastIndexOf('s', 3),
)


// 出现多个点, 应该会取
const declareFile = 'table.d.ts'
console.log(
  declareFile.substring(0, declareFile.lastIndexOf('.')),
  // 再取个只包含名字的
  declareFile.substring(0, declareFile.indexOf('.'))
)
console.log('\n')



// 相同用法, 一起记
/* arr.findIndex()
一参是回调, 二参是this
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
返回索引 */

/* find是找值, findIndex是找索引, 适合复杂数据类型的查索引 */

const arr = [
  { name: 'Edward', score: 21 },
  { name: 'Sharpe', score: 97 },
  { name: 'And', score: 45 },
  { name: 'The', score: 82 },
  { name: 'Magnetic', score: 100 },
  { name: 'Zeros', score: 7 },
  { name: 'Jack', score: 67 },
]
let idx = arr.findIndex(item => item.score >= 60)
console.log(
  idx,
  arr[idx]
)


/* arr.indexOf()
一参是要查的数组的项, 二参是从某索引开始查
返回索引 */

/* indexOf和lastIndexOf适合查简单数据类型组成的数组, 方便判断=== */

const arr2 = [0, 1, false, null, '1', 2, undefined, 3, 5, NaN, '', 8]
console.log(
  arr2.indexOf(2),
  arr2.lastIndexOf(false)
)

/* arr.lastIndexOf()
一参是要查的数组的项, 二参是从某索引开始查
返回索引 */