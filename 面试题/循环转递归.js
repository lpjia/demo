const arr = [1, 2, 3, 4, 5, 6]
// 实现求和


// // 递归
// function sum(arr, i = 0) {
//   if (i >= arr.length) return 0 // 中止条件, 下标越界
//   return arr[i] + sum(arr, i + 1)
// }


/* // 所有循环都可以转递归
// 循环转递归的一般性公式
for (初始代码; 条件代码; 循环代码) {
  循环体
}

function m() {
  初始代码;
  function _m() {
    if (!条件代码) { // 条件满足, 才执行循环体; 条件不满足, 退出循环
      return;
    }
    循环体;
    循环代码;
    _m()
  }
  _m() // 启动起来
}
 */


let sum = 0
for (let i = 0; i < arr.length; i++) {
  const item = arr[i];
  sum += item
}
function m() {
  let sum = 0
  let i = 0;
  function _m() {
    if (i >= arr.length) { // 条件满足, 才执行循环体; 条件不满足, 退出循环
      return;
    }
    const item = arr[i];
    sum += item
    i++
    _m()
  }
  _m() // 启动起来
  console.log(sum)
}
m()
// 虽然长得丑, 但也是递归



// console.log(
//   sum(arr),
// )