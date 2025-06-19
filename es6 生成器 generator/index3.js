let o2 = { // 类数组对象
  0: 'arrItem1',
  1: 'arrItem2',
  length: 2,
  // 加Symbol.iterator方法, 变为可迭代的
  *[Symbol.iterator]() {
    for (let index = 0; index < this.length; index++) {
      yield this[index];
    }
  }
}
console.log([...o2])



/* 下面的写法有问题, 返回可迭代器
let o3 = {
  0: 'arrItem1',
  1: 'arrItem2',
  length: 2,
  [Symbol.iterator]() {
    // this
    return {
      next: () => {
        // this
        for (let index = 0; index < this.length; index++) {
          return { value: this[index], done: false }
        }
        return { done: true }
      }
    }
  }
} */