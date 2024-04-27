import { deepClone } from '../util/commonMethod.js'

// 不用打印, 把代码直接粘贴到控制台中运行
// 简洁高效




/* 稀疏数组, 数组中的空元素和undefined还不一样, 空元素表示没有东西, undefined表示有东西, 但值为 undefined
[10, 20, 30, empty × 2] */
const arr7 = [10, 20, 30, , ,] // 最后一个逗号后面不算, 只算前面
const arr71 = [10, 20, 30, undefined, undefined,] // 和上一个数组里的项就不是等价的




/**
 * arr.flatMap()
 */
let arr9 = [
  { name: 'one', val: 1 },
  { name: 'five', val: 5 },
  { name: 'three', val: 3 },
  { name: 'two', val: 2 },
  { name: 'four', val: 4 },
]
// 参数和 map 方法使用一致
arr9.flatMap(item => {
  return item.val > 3 ? [item] : []
})
// 返回 [ { name: 'five', val: 5 }, { name: 'four', val: 4 }, ]
// 实际上这个例子算是 map + filter + flat 的结合







/**
 * arr.reduce()
 * [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
 */
let arr8 = [
  { id: 'one', name: 'yi' },
  { id: 'two', name: 'er' },
  { id: 'three', name: 'san' },
]
arr8.reduce((total, curr) => {
  total[curr.id] = curr.name
  return total
}, {})
// 返回 {one: 'yi', two: 'er', three: 'san'}
// 把对象数组变为对象







/**
 * arr.at()
 */
// idxArr
let arr10 = ['red', 'green', 'blue']
// arr10.at()