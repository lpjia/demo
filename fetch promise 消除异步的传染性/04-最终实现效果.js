const url = "http://127.0.0.1:8802/api/getUserInfo"
// const url = "http://rap2api.taobao.org/app/mock/288967/api/random"

function getUser() {
  return fetch(url)
}
function m1() {
  // other works
  return getUser()
}
function m2() {
  // other works
  return m1()
}
function m3() {
  // other works
  return m2()
}
function main() {
  console.log('main')
  // other works
  const user = m3()
  console.log(user)
}




function run(fn) {
  let cache = []
  let i = 0
  const _originalFetch = window.fetch
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        return cache[i].err
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    cache[i++] = result

    const promise = _originalFetch(...args).then(res => res.json()).then(
      resp => {
        console.log('_originalFetch then')
        result.status = 'fulfilled'
        result.data = resp
      },
      err => {
        console.log('_originalFetch err')
        result.status = 'rejected'
        result.err = err
      }
    )

    throw promise
  }

  try {
    // debugger
    fn()
  } catch (error) {
    if (error instanceof Promise) {
      const reRun = () => {
        console.log('reRun')
        i = 0
        fn()
      }
      // debugger
      error.then(reRun, reRun)
    }
  }
}
run(main)