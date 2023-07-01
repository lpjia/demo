// 手写 Promise 构造器

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  #state = PENDING;
  #result = void 0;

  constructor(executor) {
    const resolve = (data) => {
      /* if (this.#state !== 'pending') return;
      this.#state = 'resolved';
      this.#result = data; */

      this.#changeState(FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }
    // 只能捕获同步错误, 不能捕获异步的错误
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    console.log(this.#state, this.#result)
  }
}

const p = new MyPromise((resolve, reject) => {
  // throw 123
  // reject(2)
  resolve(1)

  // // 不能捕获异步的错误
  // setTimeout(() => {
  //   throw 456
  // }, 0)
})
// console.log(p.then(res => console.log(res)))
console.log(p)