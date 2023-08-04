// https://zh.javascript.info/async-iterators-generators


// 将它们合并，并使用 range 自身作为迭代器来简化代码。
let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    this.current = this.from
    return this
  },

  async next() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return this.current <= this.to ? { done: false, value: this.current++ } : { done: true }
  }
};

(async () => {

  for await (let value of range) {
    console.log(value); // 1,2,3,4,5
  }

})()