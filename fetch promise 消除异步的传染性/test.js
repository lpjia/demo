const url = "http://localhost:8802/api/getUserInfo"

const result = {
  status: 'pending',
  data: null,
  err: null
}

const promise = fetch(url).then(res => res.json()).then(
  resp => {
    result.status = 'fulfilled'
    result.data = resp
  },
  err => {
    result.status = 'rejected'
    result.err = err
  }
)

const fn = () => {
  console.log('fn')
  console.log(result)
}

const reRun = () => {

  i = 0
  fn()
}
promise.then(reRun, reRun)