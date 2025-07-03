/* 用在循环结构内
continue; 跳过当次循环
break; 退出循环 */

let arr = [10, 20, 30, 40, 50, 60]

/* 多层for循环, 看'标记语法.js'
多层循环结构
continue; 默认跳过当前层的当次循环
break; 默认退出当前层的循环 */

/* for循环 */

// for (let i = 0; i < arr.length; i++) {
//   const item = arr[i]
//   if (item === 30) {
//     continue; // 跳过当次循环
//   }
//   console.log(item)
// }


// for (let i = 0; i < arr.length; i++) {
//   const item = arr[i]
//   if (item === 30) {
//     break; // 退出循环
//   }
//   console.log(item)
// }


/* for...of遍历 */

// for (const item of arr) {
//   if (item === 30) {
//     continue; // 跳过当次循环
//   }
//   console.log(item)
// }


// for (const item of arr) {
//   if (item === 30) {
//     break; // 退出循环
//   }
//   console.log(item)
// }


/* forEach方法 遍历
map方法 遍历
回调内不能用continue和break */

/* forEach方法 遍历, 回调内可使用return来实现'跳过当次循环'
能模拟continue; 但不能模拟break; */

/* map方法 遍历
map的设计初衷是映射新数组而非流程控制
return在这有特殊意义, 不建议当作流程控制 */