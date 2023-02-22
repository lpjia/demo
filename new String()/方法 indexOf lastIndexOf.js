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