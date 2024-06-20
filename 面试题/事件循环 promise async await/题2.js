async function m1() {
  return 1
}
async function m2() {
  const n2 = await m1()
  console.log('n2:', n2)
  return 2
}
async function m3() {
  const n3 = m2()
  console.log('n3:', n3)
  return 3
}
m3().then((n) => {
  console.log('n:', n)
})
m3()
console.log(4)

/* 
微队列: 
交互队列:
延时队列: 


运行流程:



打印输出的顺序:

*/