/* https://www.lodashjs.com/docs/lodash.chunk */


const arr = [
  { name: 'Edward', score: 21 },
  { name: 'Sharpe', score: 97 },
  { name: 'And', score: 45 },
  { name: 'The', score: 82 },
  { name: 'Magnetic', score: 100 },
  { name: 'Zeros', score: 7 },
  { name: 'Jack', score: 67 },
]
console.log(
  // 返回移除的项组成的数组
  // 会改变原数组
  _.remove(arr, (item) => item.score < 60),
  arr
)