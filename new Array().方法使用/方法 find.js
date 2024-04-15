// 找第一个匹配的数组项

/* arr.find()
一参是回调, 二参是this
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
返回匹配的数组的项(只取第一个满足的) */

/* 找到符合条件的就会终止遍历, 只找第一个匹配的, 性能比 filter 好点 */

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
  // 找到第一个及格的数据就返回, 不再往后找了
  arr.find(item => item.score >= 60)
  // 找不到则返回undefined
)