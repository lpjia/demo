/* m1返回 Promise { 1 } */
async function m1() {
  return 1
}
// console.log(m1())

async function m2() {
  /* 需要执行await m1 */
  const n2 = await m1()
  /* 后面代码在微队列里 */
  console.log('n2:', n2)
  return 2
}

async function m3() {
  /* 需要执行m2
  m2有async, 肯定返回promise
  这里没有await, 所以不需要等待
  直接返回promise, 因为这时m2没执行完, 所以是promise pending状态 */
  const n3 = m2()
  console.log('n3:', n3)
  return 3
}

/* 先执行m3
执行完后, then方法把(n)=>xxx放进微队列里, 输出3 */
m3().then((n) => {
  console.log('n:', n)
})

/* 又执行m3 */
m3()

console.log(4)







/* 
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
 */