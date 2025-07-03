// 颠倒数组的项

/* arr.toReversed()
不改变原数组

返回颠倒后的新数组 */

let arr = [
  { num: 10 },
  { num: 20 },
  { num: 30 },
]
console.log(
  // 为了方便看, 把数组序列化(字符串化)
  JSON.stringify(arr.toReversed()) // '[{"num":30},{"num":20},{"num":10}]'
  , '----'
  , JSON.stringify(arr) // '[{"num":10},{"num":20},{"num":30}]'
)
console.log('---- 分割线 ----\n\n\n')


/* arr.reverse()
会改变原数组

返回颠倒后的数组 */

console.log(
  JSON.stringify(arr.reverse()) // '[{"num":30},{"num":20},{"num":10}]'
  , '----'
  , JSON.stringify(arr) // '[{"num":30},{"num":20},{"num":10}]'
)
console.log('---- 分割线 ----\n\n\n')