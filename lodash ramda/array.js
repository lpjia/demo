/* https://www.lodashjs.com/docs/lodash.chunk */
/* https://ramda.cn/docs/#filter */


const arr = [
  { name: 'Edward', score: 21 },
  { name: 'Sharpe', score: 97 },
  { name: 'And', score: 45 },
  { name: 'The', score: 82 },
  { name: 'Magnetic', score: 100 },
  { name: 'Zeros', score: 7 },
  { name: 'Jack', score: 67 },
]
// console.log(
//   /* 数组分块 */
//   // 分成长度为3的数组串, 前端分页好使
//   'R.splitEvery',
//   R.splitEvery(3, arr),

//   _.chunk(arr, 3),
// )
// console.log('---- 分割线 ----\n\n\n')




// const double = (x) => x * 2;
// console.log(
//   // map遍历原始类型数组
//   'R.map',
//   R.map(double, [1, 2, 3]), //=> [2, 4, 6]
//   R.map(double, { x: 1, y: 2, z: 3 }), //=> {x: 2, y: 4, z: 6}
//   R.map(double)({ x: 1, y: 2, z: 3 }) //=> {x: 2, y: 4, z: 6}
// )

/* 60以下是D, 60-74是C, 75-89是B, 90以上是A */
const rate = (item = {}) => {
  if (item.score < 60) {
    item.rate = 'D'
  }
  else if (item.score < 75) {
    item.rate = 'C'
  }
  else if (item.score < 90) {
    item.rate = 'B'
  }
  else {
    item.rate = 'A'
  }
  return item
}
console.log(
  R.map(rate, R.clone(arr))
)
console.log('---- 分割线 ----\n\n\n')





const isPass = (item) => item.score >= 60
/* filter过滤为真值的返回
reject过滤为假值的返回 */
console.log(
  'R.filter',
  R.filter(isPass, arr),
  arr
)
console.log(
  'R.reject',
  R.reject(isPass, arr),
)
console.log('---- 分割线 ----\n\n\n')



console.log(
  /* 删除从start索引开始的count个元素
  不改变原数组 */
  'R.remove',
  R.remove(2, 4, arr),
  arr
)

const arrDeepClone = _.cloneDeep(arr)
console.log(
  /* 返回移除的项组成的数组
  会改变原数组 */
  '_.remove 用法和效果和R.remove都不一样',
  _.remove(arrDeepClone, (item) => item.score < 60),
  arrDeepClone,
)
console.log('---- 分割线 ----\n\n\n')




const rate2 = (student) => {
  const { score } = student;
  return score < 60 ? 'D' :
    score < 75 ? 'C' :
      score < 90 ? 'B' :
        'A';
}
/* 直接封装成纯函数, 方便调用, 也方便调试和测试 */
const groupBy = R.groupBy(rate2)

console.log(
  'R.groupBy',
  R.groupBy(rate2, arr),
  groupBy(arr),

  _.groupBy(arr, rate2)
)