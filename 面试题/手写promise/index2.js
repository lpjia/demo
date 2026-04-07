/* const p = new Promise((resolve, reject) => {
  throw 123
}) */

const p = new Promise((resolve, reject) => {
  console.log('会立即执行1')

  setTimeout(() => {
    // throw 123
    resolve(1)
  }, 0);
})
const p2 = new MyPromise((resolve, reject) => {
  console.log('会立即执行2')

  setTimeout(() => {
    // throw 123
    resolve(2)
  }, 0);
})

console.log(p)
console.log(p2)