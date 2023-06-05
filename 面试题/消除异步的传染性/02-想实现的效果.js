const url = "http://localhost:8802/api/getUserInfo"

// 纯函数不能有副作用, 也就是函数不管调用多少次, 都会返回一样的结果(不改变无关的值等副作用)
// 纯函数不能有promise, 因为状态会变, 有副作用
function getUser() {
  return fetch(url)
  // 去掉异步后, 变为同步
  // 需要此函数必须立即返回结果
  // 但网络通信需要时间, 无法做到立即
  // 只能报错
}
function m1() {
  // other works
  return getUser()
}
function m2() {
  // other works
  return m1()
}
function m3() {
  // other works
  return m2()
}
function main() {
  // other works
  const user = m3()
  console.log(user)
}
main()
// 但没有实现获取到数据