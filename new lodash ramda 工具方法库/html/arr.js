const arr = [
  { name: 'Edward', score: 21 },
  { name: 'Sharpe', score: 97 },
  { name: 'And', score: 45 },
  { name: 'The', score: 82 },
  { name: 'Magnetic', score: 100 },
  { name: 'Zeros', score: 7 },
  { name: 'Jack', score: 67 },
]




/* splitEvery
list分块chunk */
// console.log(R.splitEvery(3, arr))
// console.log(_.chunk(arr, 3))


// const str = 'Magnetic'
// console.log(R.splitEvery(3, str))




/* map 遍历 */
/* 60分以下是D, 60-74分是C, 75-89分是B, 90分以上是A */
const rate = (item) => {
  let r = null

  if (item.score < 60) r = 'D'
  else if (item.score < 75) r = 'C'
  else if (item.score < 90) r = 'B'
  else r = 'A'

  return { ...item, rate: r }
}
let arrOfRate = R.map(rate, R.clone(arr))
console.log(arrOfRate)
console.log(arr)
console.log('---- 分割线 ----\n\n\n')





/* filter 过滤为真值的返回
reject 过滤为假值的返回 */
// const isPass = (item) => item.score >= 60
// console.log(R.filter(isPass, arr))
// console.log(R.reject(isPass, arr))
// console.log('---- 分割线 ----\n\n\n')



// /* remove
// 删除列表中从 start 开始的 count 个元素, 不改变原列表 */
// console.log(R.remove(2, 4, arr))

// /* _.remove(array, 函数)
// 返回移除的项组成的数组, 会改变原数组 */
// console.log(_.remove(R.clone(arr), (item) => item.score < 60))
// console.log(arr)
// console.log('---- 分割线 ----\n\n\n')





/* groupBy
将列表根据一定规则拆分成多组子列表，并存储在一个对象中 */
console.log(
  R.groupBy((item) => item.rate, arrOfRate)
)
/* R支持柯里化 */
const group_by = R.groupBy((item) => item.rate)
console.log(group_by(arrOfRate))

/* _.groupBy */
console.log(
  _.groupBy(arrOfRate, (item) => item.rate)
)
/* Object.groupBy */
console.log(
  Object.groupBy(arrOfRate, (item) => item.rate)
)