console.log("start");
setTimeout(() => {
  console.log("children2")
  Promise.resolve().then(() => {
    console.log("children3")
  })
}, 0)

new Promise(function (resolve, reject) {
  console.log("children4")
  setTimeout(function () {
    console.log("children5")
    resolve("children6")
  }, 0)
}).then(res => {
  console.log("children7")
  setTimeout(() => {
    console.log(res)
  }, 0)
})


/* 
渲染主线程:全局 

微队列: 
交互队列: 
延时队列:  


打印
start
children4
children2
children3
children5
children7
children6
*/