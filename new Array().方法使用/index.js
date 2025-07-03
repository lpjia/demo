
// 快速创建数组, 数组项是批量搞的
// Array(定数组长度).fill(填充数组项)
console.log(
  Array(6).fill('3') // ['3', '3', '3', '3', '3', '3']
)
console.log('---- 分割线 ----\n\n\n')

// 2025-06-18 10:27 星期三
// 以上内容是这个时间点写的






const myArray = [null, false, 'Hello', undefined, 0];

// 过滤虚值
const filtered = myArray.filter(Boolean);
filtered // ['Hello']
// 等价于上面, Boolean 函数本身接受一个参数，并根据参数的真实性返回 true 或 false
myArray.filter(val => Boolean(val)) // ['Hello']

// 检查至少一个值是否为真
const someTruthy = myArray.some(Boolean);
someTruthy // true

// 检查所有的值是否为真
const allTruthy = myArray.every(Boolean);
allTruthy // false







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