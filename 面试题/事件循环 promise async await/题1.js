function mm() {
  return 0;
}
async function m() {
  console.log(1)
  const n = await mm()
  // 相当于const n = await 0
  // 相当于const n = await Promise.resolve(0)
  console.log(n)
  return 2
}
// // 相当于
// function m() {
//   console.log(1)
//   return Promise.resolve(0).then(n => { // !!! then方法就成
//     console.log(n)
//     return 2
//   })
// }
// 想不明白 m 啥时候返回, 看!!!行
console.log(
  m()
)
console.log(3)

/* 
微队列: 输出0
交互队列:
延时队列: 


运行流程:
运行m的同步代码
  输出1
  运行mm的同步代码
    返回0
  m同步代码结束, 返回Promise, 此时是pending状态
  mm完成后将输出0推入微队列
输出3
--------
运行微队列的输出0, 返回2
m()返回的Promise, 此时是fulfilled状态


打印输出的顺序:
1
Promise {} pendding 后面变为 fulfilled 2
3
0
*/