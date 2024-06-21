const p = new MyPromise((resolve, reject) => {
  // throw 123
  // reject(2)
  resolve(1)
})
console.log(
  p
)