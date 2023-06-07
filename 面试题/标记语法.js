// // 没有按照预期的退出顶层循环, 还继续循环剩下的
// for (let i = 0; i < 5; i++) {
//   console.log('顶层循环')
//   for (let j = 0; j < 6; j++) {
//     console.log('内层循环', i, j)
//     if (i * j > 12) {
//       console.log('退出顶层循环')
//       break
//     }
//   }
// }


outer: for (let i = 0; i < 5; i++) {
  console.log('顶层循环')
  for (let j = 0; j < 6; j++) {
    console.log('内层循环', i, j)
    if (i * j > 12) {
      console.log('退出顶层循环')
      break outer
    }
  }
}


/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label */