// 遍历数组

/* arr.map()
一参是回调, 二参是this
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
返回一个新数组 */
let arr = [
  { num: 10 },
  { num: 20 },
  { num: 30 },
]

// 推荐这种写法, 重新组装{}, 不影响原数组
let result = arr.map(item => {
  return { num: item.num * 10 }
})

/* 慎用=>的简写形式, 返回的可能是非预期结果
有时候也会改变原数据 */
// let result = arr.map((item, idx) => item.id = idx)
// let result = arr.map((item, idx) => { return item.id = idx }) // 省略return

console.log('result:', result)
console.log('arr:', arr)


let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 学习这种简写的写法, 有助于提升水平
let result2 = arr2.map(String);
// 返回 ['1', '2', '3', '4', '5', '6', '7', '8', '9']
console.log('result2:', result2)


let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 学习这种简写的写法, 有助于提升水平
let result3 = arr3.map(Math.pow);
// 返回 [1, 2, 9, 64, 625, 7776, 117649, 2097152, 43046721]
console.log('result3:', result3)
/* 为啥没有返回预期的 [1, 4, 9, ...]
因为 map 方法接收的第一个参是函数, 该函数内的参顺序是 item, idx, arrayItself
Math.pow 方法接收的参顺序是 底数, 指数
所以计算结果是按 item 的 idx 次幂算的 */



/* arr.forEach()
一参是回调, 二参是this
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
无返回值 */

/* 和map的用法类似
不要使用=>简写, 因为不需要返回 */
