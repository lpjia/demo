console.log(1)
new Promise((resolve, reject) => {
  console.log(2)
  resolve(3)
}).then(res => {
  setTimeout(() => {
    console.log(res)
  }, 0)
  console.log(4)
})
setTimeout(() => {
  console.log(5)
}, 0)
console.log(6)

/* 
渲染主线程:全局 

微队列: 
交互队列: 
延时队列: 


打印
1
2
6
4
5
3

*/