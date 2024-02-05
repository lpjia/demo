console.log('worker全局this:', this)
console.log('worker全局对象self === this:', self === this)
const that = this
function fn(num) {
  console.log(num);
}

self.onmessage = function (e) {
  console.log('e:', e)
  console.log('e.data:', e.data)
  fn(e.data);

  console.log('self.location:', location)
  console.log('self.navigator:', navigator)

  console.log('函数内this:', this) // 类似主线程函数this指向window对象, worker指向self
  console.log('that === this:', that === this)

  postMessage('从worker.js返回的字符串信息')
}