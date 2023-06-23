setTimeout(() => {
  console.log('first timeout')
  Promise.resolve().then(() => {
    console.log('first Promise')
  })
})
Promise.resolve().then(() => {
  console.log('second Promise')
  setTimeout(() => {
    console.log('second timeout')
  })
})
setTimeout(() => {
  console.log('Third timeout')
  Promise.resolve().then(() => {
    console.log('Third Promise')
  })
})
Promise.resolve().then(() => {
  console.log('Fourth Promise')
  setTimeout(() => {
    console.log('Fourth timeout')
  })
})
console.log('main')


/* 
渲染主线程 全局
微队列  
交互队列
延时队列


main
2p
4p
1t
1p
3t
3p
2t
4t

*/