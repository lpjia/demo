
const url = "http://127.0.0.1:8802/api/getUserInfo"

const result = {
  status: 'pending',
  data: null,
  err: null
}

// const promise = fetch(url).then(res => res.json())
//   .then(
//     resp => {
//       console.log('完成回调') // 先
//       result.status = 'fulfilled'
//       result.data = resp
//     },
//     err => {
//       console.log('失败回调')
//       result.status = 'rejected'
//       result.err = err
//     }
//   )

const fn = () => {
  console.log('fn')
  console.log(result)
}

const reRun = () => {
  console.log('reRun') // 后
  i = 0
  fn()
}

// promise.then(reRun, reRun)




const promise = fetch(url).then(res => res.json())
  .then(
    resp => {
      console.log('完成回调')
      result.status = 'fulfilled'
      result.data = resp
    },
    err => {
      console.log('失败回调')
      result.status = 'rejected'
      result.err = err
    }
  )
  .then(reRun, reRun) // 作为对比就好理解先后执行顺序了