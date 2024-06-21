/* 手写 Promise 构造器
promise的状态一旦改变, 就不会再变了
链式调用
延迟执行 */

/* 用常量代替硬编码 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  /* # 类的私有成员, 新特性
  用来代替下划线私有成员命名法 _state、_result、_changeState */
  #state = PENDING;
  #result = void 0;
  /* 私有属性#handler来记录onFulfilled、onRejected、resolve、reject */
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      /* if (this.#state !== 'pending') return;
      this.#state = 'resolved';
      this.#result = data; */
      /* 重复代码, 提取出来 */

      this.#changeState(FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }
    /* 只能捕获同步错误, 不能捕获异步的错误
    比如定时器内, 再抛出错误, 无法改变state, state仍是初始值 pending */
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state, result) {
    /* promise的状态一旦被改变, 则不会再变了 */
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    // console.log(this.#state, this.#result)
    this.#run()
  }

  /* 是否符合promise A+ 规范
  只要符合, 就具有互操作性 */
  #isPromiseLike(value) {
    // return value && typeof value.then === 'function' // 简单版
    return value !== null && (typeof value === 'object' || typeof value === 'function') && (typeof value.then === 'function')
  }

  /* 运行then方法里的回调是放到微队列里的 */
  #runMicroTask(fn) {
    queueMicrotask(fn) // 这是一个新特性, 可以放心用
    // 也可以用 Promise.resolve().then(函数), 没啥意思了
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result)
        return;
      }
      try {
        const data = callback(this.#result)
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject)
        }
        else {
          resolve(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()
      if (this.#state == FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      }
      else {
        this.#runOne(onRejected, resolve, reject)
      }

      /* if (this.#state == FULFILLED) {
        // 是函数
        if (typeof onFulfilled === 'function') {
          // onFulfilled调用万一要是失败呢?
          try {
            const data = onFulfilled(this.#result)
            resolve(data)
          } catch (error) {
            reject(error)
          }
          // onFulfilled(this.#result)
        }
        // 非函数则直接穿透
        else {
          resolve(this.#result)
        }
      }
      else {
        // 和上面捕获错误逻辑一致, 重复代码有点多, 来dry原则, don't repeat yourself
        if (typeof onRejected === 'function') {
          onRejected(this.#result)
        }
        else {
          reject(this.#result)
        }
      } */
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      /* 先记录4个数据 */
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()

      /* // 当前状态是已完成, 把结果作为参传过去, 已拒绝也是一样
      if (this.#state === FULFILLED) {
        onFulfilled(this.#result)
      }
      else if (this.#state === REJECTED) {
        onRejected(this.#result)
      }
      else {} 当挂起时, then方法既不会执行一函数, 也不会执行二函数
      而在计时结束后, then方法已经运行结束了, 再也没机会执行onFulfilled或onRejected
      关键是要在then方法里知道当前promise什么时候完成或拒绝, 也就是状态已变化
      状态变化是在#changeState方法, 问题是#changeState方法里拿不到then方法的onFulfilled、onRejected、resolve、reject这4个数据
      既然跨方法拿不到4个数据, 那就提出来变成公共的
      挂起结束后 */
    })
  }
}