const url = "http://localhost:8802/api/getUserInfo"

// 纯函数不能有副作用, 也就是函数不管调用多少次, 都会返回一样的结果(不改变无关的值等副作用)
// 纯函数不能有promise, 因为状态会变, 有副作用
function getUser() {
  return fetch(url)
  // 去掉异步后, 变为同步
  // 需要此函数必须立即返回结果
  // 但网络通信需要时间, 无法做到立即
  // 只能报错
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
  // other works
  const user = m3()
  console.log(user)
}
// main()


// 首先不能有侵入性


function run(fn) {
  // 缓存 
  // 函数fn执行期间可能多次调用fetch, 就会产生多个缓存结果
  let cache = []
  // 第几次调用fetch, 每次+1
  // 表示某一次运行中, 调用fetch的次数, 下一次再运行的时候, 要把下标清空
  let i = 0
  // 拿到原来的fetch
  const _originalFetch = window.fetch
  // 改动fetch函数
  window.fetch = (...args) => {
    // 有缓存
    if (cache[i]) {
      // 交付缓存结果
      if (cache[i].status === 'fulfilled') { // 完成
        return cache[i].data
      } else if (cache[i].status === 'rejected') { // 失败
        throw cache[i].err
      }
    }
    // 结果, 一个通信有哪些信息要记录?
    // 状态, 通信完成没有, 也就是promise的状态
    // promise完成后的数据是啥
    // 有没有错误
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    // 加入到缓存, 第一次是假缓存
    cache[i++] = result

    // 发送请求
    const promise = _originalFetch(...args).then(res => res.json()).then(
      resp => {
        result.status = 'fulfilled'
        result.data = resp
      },
      err => {
        result.status = 'rejected'
        result.err = err
      }
    )
    // 报错
    // 把这个promise作为错误抛出去
    throw promise
  }
  // fn() // 调用前改动fetch函数(不能对getUser函数有侵入性, 只能改fetch的默认行为), 看上面window.fetch
  // 怎么重新启动函数执行
  try {
    fn()
  } catch (error) {
    // 什么时候引发重新执行fn
    // 捕获到的错误是promise
    if (error instanceof Promise) {
      const reRun = () => {
        // 表示某一次运行中, 调用fetch的次数, 下一次再运行的时候, 要把下标清空, 才能命中之前的缓存
        i = 0
        fn()
      }
      // 完成或失败都要去重新执行
      error.then(reRun, reRun)
    }
  }
}
run(main)