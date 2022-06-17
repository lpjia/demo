function add() {
  for (let i = 0; i < 5000; i++) {
    a++
    b++
  }
}
// add()

let c = null

self.onmessage = function (e) {
  console.log("🚀 ~ file: worker.js ~ line 10 ~ e", e);
  console.log("🚀 ~ file: worker.js ~ line 15 ~ e.data", e.data);
  c = e.data;
  fn(c);

  console.log("🚀 ~ file: worker.js ~ line 18 ~ self", self);
  console.log("🚀 ~ file: worker.js ~ line 20 ~ self.location", self.location);
  console.log("🚀 ~ file: worker.js ~ line 22 ~ navigator", navigator);
}

function fn(num) {
  console.log("🚀 ~ file: worker.js ~ line 23 ~ fn ~ num", num);
}