function fn1(name, age) {
  console.log(`我是${name}, 我今年${age}岁`)
}

const fn2 = function (name, age) {
  console.log(`我是${name}, 我今年${age}岁`)
}

const arrowFn = (name, age) => {
  console.log(`我是${name}, 我今年${age}岁`)
}

console.log(Function.prototype === fn1.__proto__) // true
console.log(Function.prototype === fn2.__proto__) // true
console.log(Function.prototype === arrowFn.__proto__) // true