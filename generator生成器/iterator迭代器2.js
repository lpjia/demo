// https://zh.javascript.info/iterable


// 将它们合并，并使用 range 自身作为迭代器来简化代码。
let range = {
  from: 1,
  to: 10,

  [Symbol.iterator]() {
    this.current = this.from
    return this
  },

  next() {
    return this.current <= this.to ? { done: false, value: this.current++ } : { done: true }
  }
}

for (let num of range) {
  console.log('num: ', num)
}