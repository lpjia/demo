// https://zh.javascript.info/iterable


// 创建一个对象
let range = {
  from: 1,
  to: 5
}
// 给一个obj添加迭代器功能

// 1. for..of 调用首先会调用这个：
range[Symbol.iterator] = function () {

  // ……它返回迭代器对象（iterator object）：
  // 2. 接下来，for..of 仅与此迭代器一起工作，要求它提供下一个值
  return {
    current: this.from,
    last: this.to,
    // 3. next() 在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      return this.current <= this.last ? { done: false, value: this.current++ } : { done: true }
    }
  }
}

// 现在它可以运行了！
for (let num of range) {
  console.log('num: ', num)
}