/* worker全局是 self */
console.log(
  globalThis === self,
  this === self,
  self
)

const that = this
function fn(num) {
  console.log(num);
}

console.log('self.location:', location)
console.log('self.navigator:', navigator)

/* 事件监听, 接收主线程发过来的数据 */
self.onmessage = function (e) {
  console.log('e:', e) // event对象
  console.log('worker.js e.data:', e.data) // e.data是主线程传过来的数据
  fn(e.data);

  postMessage('从worker.js返回的字符串信息')
}
console.log('---- 分割线 ----\n\n\n')