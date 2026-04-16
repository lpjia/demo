// 找元素

/* arr.find()
一参是回调, 二参(可选)是执行回调时用作this的值

一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身

返回满足callback的第一个元素, 否则返回undefined */


/* 一参函数
按照数组中元素的索引升序依次调用回调, 直到回调返回真值为止
find 方法随后返回该元素并停止遍历数组 */

const array = [5, 12, 8, 130, 44];
array.find((item) => item > 10);





/* arr.findIndex()
一参是回调, 二参(可选)是执行回调时用作this的值

一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身

从左到右查, 第一个满足回调返回true的数组项的索引
也就是第一次出现的位置(按人的习惯从左到右)

找不到则返回-1

返回索引 */



/* find是找值(数组项), findIndex是找索引, 适合复杂结构的数据
值找不到返回 undefined, 索引找不到返回 -1

arr.findLastIndex()  从右到左查  也就是最后一次出现的位置
arr.find()  从左到右查  也就是第一次出现的数组项
arr.findLast()  从右到左查  也就是最后一次出现的数组项 */


const arr = [0, NaN, 1, false, null, '1', 2, undefined, 3, 5, '', 8]
const arr2 = [
  { name: 'Edward', score: 21 },
  { name: 'Zeros', score: 7 },
  { name: 'And', score: 45 },
  { name: 'Magnetic', score: 100 },
  { name: 'Sharpe', score: 97 },
  { name: 'Jack', score: 57 },
  { name: 'The', score: 82 },
]
let idx = arr2.findIndex(item => item.score >= 60) // 3
console.log(
  arr.findIndex(Boolean) // 2
  , arr2.findIndex(item => item.score >= 60) // 3
  , arr2.find(item => item.score >= 60) // { name: 'Magnetic', score: 100 }

  // 也可以根据索引[]找
  , arr2[idx] // { name: 'Magnetic', score: 100 }
)
console.log('---- 分割线 ----\n\n\n')

console.log(
  arr2.length // 7
  , arr2.findLastIndex(item => item.score < 60) // 5
  , arr2.findLast(item => item.score < 60) // { name: 'Jack', score: 57 }
)
console.log('---- 分割线 ----\n\n\n')