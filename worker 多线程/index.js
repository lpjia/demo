let a = 0
  , b = 0
  , c = {
    a,
    b
  }

let worker = new Worker("worker.js")
let worker_2 = new Worker("worker_2.js")

// worker.postMessage({a:a,b:b})
worker.postMessage(c)
worker_2.postMessage([a,b])
