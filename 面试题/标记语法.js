// 没有按照预期的退出顶层循环, 还继续循环剩下的
for (let i = 0; i < 5; i++) {
  console.log('顶层循环')
  for (let j = 0; j < 6; j++) {
    console.log('内层循环', i, j)
    if (i * j > 11) {
      console.log('退出顶层循环')
      break; // 中止当前(最内层)循环
    }
  }
}


outer: for (let i = 0; i < 5; i++) {
  console.log('顶层循环')
  for (let j = 0; j < 6; j++) {
    console.log('内层循环', i, j)
    if (i * j > 11) {
      console.log('退出顶层循环')
      break outer; // 中止标记的循环
    }
  }
}



/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label */