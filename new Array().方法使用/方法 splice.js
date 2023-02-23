// 通过删除或替换现有元素或者原地添加新的元素来修改数组

/* arr.splice()
一参是 startIdx, 二参是删除数组的项个数(可选), 三参是数组添加的项(可选)
返回删除项组成的数组 */

/* 一参传负数, 会从右到左开始找索引(索引计算依旧是从左到右 0→n)
会改变原数组 */

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
  arr.splice(1, 1), '\n',
  arr.splice(-1, 1, { name: 'newLastOne', score: 1 }), '\n',
  arr
)