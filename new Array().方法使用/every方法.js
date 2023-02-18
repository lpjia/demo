// 遍历数组, 元素项是否都能通过回调的测试



/* arr.every()
一参是回调, 二参是this
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
返回布尔值 */

/* 回调的每一次返回都为真值的话, 则every方法返回true, 否则返回false
every方法不会改变原数组
若收到一个空数组，此方法在任何情况下都会返回 true */
let arr = [
  { num: 10 },
  { num: 20 },
  { num: 30 },
]

let result = arr.every(item => item.num > 15)
// 回调的每一次返回都为真值的话, 则every方法返回true, 否则返回false

console.log('result:', result)
console.log('arr:', arr)
