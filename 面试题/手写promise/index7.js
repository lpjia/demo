const p = new Promise((resolve, reject) => {
  resolve(1)
})
console.log(
  // p,

  // Promise.resolve(p),
  // Promise.myResolve(p),

  // Promise.resolve(Promise.reject(3)),
  // Promise.myResolve(Promise.myReject(3)),

  // Promise.resolve(2),
  // Promise.myResolve(2),

  // Promise.resolve().then(() => 4),
  // Promise.myResolve().then(() => 4),
)

Promise.myAll([1, 2, Promise.reject(3), Promise.reject(4)]).then(
  (datas) => {
    console.log('datas:', datas)
  },
  (err) => {
    console.log('err:', err)
  }
)

Promise.myAll([1, 2, 3, 4]).then(
  (datas) => {
    console.log('datas:', datas)
  },
  (err) => {
    console.log('err:', err)
  }
)