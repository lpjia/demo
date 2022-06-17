function add() {
  for (let i = 0; i < 5000; i++) {
    a++
    b++
  }
}
// add()


// self 可省略, 作为子线程的全局对象
self.onmessage = function (e) {
  console.log("🚀 ~ file: worker.js ~ line 12 ~ e", e)
  console.log("🚀 ~ e", e)
  console.log(e);
  console.log(e.data);

  console.log(self);
  console.log(self.location);
  console.log(navigator);
}