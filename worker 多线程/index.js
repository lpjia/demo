let a = 0
  , b = 0
  , c = {
    a,
    b
  }

let worker = new Worker("./worker.js")
let worker2 = new Worker("./worker2.js")

// worker.postMessage({a:a,b:b})
worker.postMessage(c)
worker2.postMessage([a, b])

worker.onmessage = (e) => {
  console.log('主线程 e.data:', e.data)
}
worker2.onmessage = (e) => {
  console.log('主线程 e.data:', e.data)
}