const p = new MyPromise((resolve, reject) => {
  // throw 123
  // reject(2)
  resolve(1)
})
const p2 = new Promise((resolve, reject) => {
  // throw 123
  // reject(2)
  resolve(1)
})

console.log(p)
console.log(p2)