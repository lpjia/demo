// 通过删除或替换现有元素或者原地添加新的元素来修改原数组

/* arr.splice()
一参是 startIndex, 二参是删除数组的项个数(可选), 三参是数组添加的项(可选)

返回删除项组成的数组 */

/* 如果没删除任何一项, 则返回空数组 */

/* arr.splice(-x, ...)
一参传负数, 会从右到左开始找, 索引计算按→
负数可认为是arr.length+(-x) */

/* toSpliced方法返回一份新数组, 二参是跳过数组的项个数 */

/* 无论添加、替换或删除数组项
索引按人的惯性思维, 是从左到右
不分正负数, 索引按0和正数(→)、-x(←)
x按照←计数
一参索引理解, 每个数组项的索引, 匹配了之后, 在前面(左边)那个空隙开始操作
无论删除与否, 删除几个, 都从空隙开始数
添加数组项也是从那个空隙加 */

// length=7
const arr = [
  { name: 'Edward', score: 21 },
  { name: 'Sharpe', score: 97 },
  { name: 'And', score: 45 },
  { name: 'The', score: 82 },
  { name: 'Magnetic', score: 100 },
  { name: 'Zeros', score: 7 },
  { name: 'Jack', score: 67 },
]
const arrCopy = JSON.parse(JSON.stringify(arr))

console.log(
  JSON.stringify(arrCopy.toSpliced(1, 2)) // length=5
  // [{"name":"Edward","score":21},{"name":"The","score":82},{"name":"Magnetic","score":100},{"name":"Zeros","score":7},{"name":"Jack","score":67}]
  // 从索引1位置左边空隙开始, 跳过2个, 返回一份新数组, length=5
)
console.log(
  JSON.stringify(arrCopy) // length=7
)
console.log(
  JSON.stringify(arrCopy.toSpliced(-1, 1, { name: 'newLastOne', score: 1 })) // length=7
  // [{"name":"Edward","score":21},{"name":"Sharpe","score":97},{"name":"And","score":45},{"name":"The","score":82},{"name":"Magnetic","score":100},{"name":"Zeros","score":7},{"name":"newLastOne","score":1}]
  // 从索引(7-1=6)位置, 也就是倒数第一个左边空隙开始, 跳过1个, 并从索引位置添加一项, 返回一份新数组, length=7
)
console.log(
  JSON.stringify(arrCopy.toSpliced(-2, 3, { name: 'newLastOne', score: 11 }))
  // [{"name":"Edward","score":21},{"name":"Sharpe","score":97},{"name":"And","score":45},{"name":"The","score":82},{"name":"Magnetic","score":100},{"name":"newLastOne","score":11}]
  // 从索引(7-2=5)位置, 也就是倒数第二个左边空隙开始, 跳过3个(实际就2项, 跳过2个), 并从索引位置添加一项, 返回一份新数组, length=6
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  JSON.stringify(arr.splice(1, 2))
  // [{"name":"Sharpe","score":97},{"name":"And","score":45}]
  , '----'
  , JSON.stringify(arr) // length=5
  // [{"name":"Edward","score":21},{"name":"The","score":82},{"name":"Magnetic","score":100},{"name":"Zeros","score":7},{"name":"Jack","score":67}]
  , '----'
  , JSON.stringify(arr.splice(-1, 1, { name: 'newLastOne', score: 1 }))
  // [{"name":"Jack","score":67}]
  , '----'
  , JSON.stringify(arr.splice(-2, 1, { name: 'newOne', score: 111 })) // [{"name":"Zeros","score":7}]
  , '----'
  , JSON.stringify(arr) // length=5
  // [{"name":"Edward","score":21},{"name":"The","score":82},{"name":"Magnetic","score":100},{"name":"newOne","score":111},{"name":"newLastOne","score":1}]
)
console.log('---- 分割线 ----\n\n\n')


/* 往数组开头 末尾 中间
添加 删除 替换
一项或多项 */
const arrCopy2 = JSON.parse(JSON.stringify(arrCopy))

console.log(
  /* 往开头添加一项, 3种方案 */
  // arrCopy2.unshift('toStartAddOne'), arrCopy2
  // arrCopy2.toSpliced(0, 0, 'toStartAddOne')
  // ['toStartAddOne'].concat(arrCopy2)

  /* 往开头添加多项, 3种方案 */
  // for-of 配合 unshift
  // arrCopy2.toSpliced(0, 0, ...['toStartAddOne', 'onetwo']) // toSpliced 第三参传 数组+解构
  // ['toStartAddOne', 'onetwo'].concat(arrCopy2)

  /* 开头删除一项, 2种方案 */
  // arrCopy2.shift(), arrCopy2
  // arrCopy2.toSpliced(0, 1)

  /* 开头删除多项, 2种方案 */
  // for-of 配合 shift
  // arrCopy2.toSpliced(0, 3)

  /* 开头替换一项, 2种方案 */
  // arrCopy2.toSpliced(0, 1, 'toStartAddOne')
  // shift 配合 unshift

  /* 开头替换多项, 1种方案 */
  // arrCopy2.toSpliced(0, 2, ...['toStartAddOne', 'onetwo'])
)

console.log(
  /* 往末尾添加一项, 3种方案 */
  // arrCopy2.push('toEndAddOne'), arrCopy2
  // arrCopy2.toSpliced(arrCopy2.length, 0, 'toEndAddOne')
  // arrCopy2.concat('toEndAddOne') // 或参传数组['toEndAddOne']

  /* 往末尾添加多项, 3种方案 */
  // for-of 配合 push
  // arrCopy2.toSpliced(arrCopy2.length, 0, ...['toEndAddOne', 'onetwo']) // toSpliced 第三参传 数组+解构
  // arrCopy2.concat(['toEndAddOne', 'onetwo'])

  /* 末尾删除一项, 2种方案 */
  // arrCopy2.pop(), arrCopy2
  // arrCopy2.toSpliced(-1, 1)

  /* 末尾删除多项, 3种方案 */
  // for-of 配合 pop
  // arrCopy2.toSpliced(-3, 3)
  // arrCopy2.length = 4, arrCopy2

  /* 末尾替换一项, 2种方案 */
  // arrCopy2.toSpliced(-1, 1, 'toEndAddOne')
  // pop 配合 push

  /* 末尾替换多项, 2种方案 */
  // arrCopy2.toSpliced(-2, 2, ...['toEndAddOne', 'onetwo'])
  // arrCopy2.length = 5, arrCopy2.concat(['toEndAddOne', 'onetwo'])
)

console.log(
  /* 往中间添加一项, 1种方案 */
  // arrCopy2.toSpliced(4, 0, 'toMiddleAddOne')

  /* 往中间添加多项, 1种方案 */
  // arrCopy2.toSpliced(4, 0, ...['toMiddleAddOne', 'onetwo']) // toSpliced 第三参传 数组+解构

  /* 中间删除一项, 1种方案 */
  // arrCopy2.toSpliced(4, 1)

  /* 中间删除多项, 1种方案 */
  // arrCopy2.toSpliced(2, 3)

  /* 中间替换一项, 2种方案 */
  // arrCopy2.toSpliced(4, 1, 'toMiddleAddOne')
  // arrCopy2[4] = 'toMiddleAddOne', arrCopy2

  /* 中间替换多项, 1种方案 */
  // arrCopy2.toSpliced(4, 2, ...['toMiddleAddOne', 'onetwo'])
)