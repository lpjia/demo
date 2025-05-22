// 通过删除或替换现有元素或者原地添加新的元素来修改原数组

/* arr.splice()
一参是 startIdx, 二参是删除数组的项个数(可选), 三参是数组添加的项(可选)
返回删除项组成的数组 */

/* 如果没删除任何一项, 则返回空数组 */

/* arr.splice(-x, ...)
一参传负数, 会从右到左开始找, 索引计算按→
负数可认为是arr.length+(-x) */

const arr = [
  { name: 'Edward', score: 21 },
  { name: 'Sharpe', score: 97 },
  { name: 'And', score: 45 },
  { name: 'The', score: 82 },
  { name: 'Magnetic', score: 100 },
  { name: 'Zeros', score: 7 },
  { name: 'Jack', score: 67 },
]
/* 统一理解
无论添加还是删除数组项
一参索引理解, 每个数组项的索引, 匹配了之后, 在前面(左边)那个空隙开始操作
无论删除与否, 删除几个, 都从空隙开始数 */

/* 分开单独理解
有删除项的
一参索引理解, 按人的惯性思维
不分正负数, 索引按0和正数(→)、-x(←)
x是←计数 */
console.log(
  // arr.splice(1, 2), '\n',
  // arr.splice(-1, 1, { name: 'newLastOne', score: 1 }), '\n',
  // arr.splice(-2, 1, { name: 'newLastOne', score: 1 }), '\n',
  // arr
)

/* 分开单独理解
没删除项的
一参索引理解, 每个数组项的索引, 匹配了之后, 在前面那个空隙插入数据 */
console.log(
  // arr.splice(-1, 0, { name: 'newLastOne', score: 1 }), '\n',
  // arr.splice(-2, 0, { name: 'newLastOne', score: 1 }), '\n',
  arr.splice(2, 0, { name: 'newLastOne', score: 1 }), '\n',
  arr
)


// for (const item of [111, 222, 333]) {
//   arr.push(item)
// }

/* 在数组末尾添加一项或多项 */
console.log(
  // arr.splice(arr.length, 0, 111), '\n',
  // arr.splice(arr.length, 0, ...[111, 222, 333]), '\n', // 数组解构
  /* arr.splice(arr.length, ...)
  一参传数组长度, startIdx >= arr.length, 二参传几都不会删除数组项 */
  // arr.splice(arr.length, 1, 111), '\n',


  // arr.concat(111), '\n',
  // arr.concat([111, 222, 333]), '\n',


  // arr, '\n', // 结合上面forof循环看push
  // arr.push(1), '\n',
)