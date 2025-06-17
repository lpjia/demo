/* a是什么才能打印true
var a = ?
console.log(a == 1 && a == 2 && a == 3) */


var obj = { name: 'o' }
console.log(
  obj.valueOf(), // valueOf方法如果不重写(Object.prototype有valueOf方法), 默认返回对象本身
  obj.toString(), // '[object Object]'
  obj == '[object Object]', // true
)
console.log('---- 分割线 ----\n\n\n')


/* var a = {
  n: 1,
  [Symbol.toPrimitive](hint) {
    console.log('hint:', hint) // 'default'
    // return 123 // 不满足要求
    // return {} // 报错
    return this.n++ // 满足要求
  }
}
console.log(a == 1 && a == 2 && a == 3) */


/* var a = {
  n: 1,
  // 方法重写
  valueOf() { // 无参
    // return {} // 不满足要求
    return this.n++ // 满足要求
  }
}
console.log(a == 1 && a == 2 && a == 3) */


/* var a = {
  n: 1,
  // 方法重写
  valueOf() { // 无参
    return {} // 不满足要求
  },
  // 方法重写
  toString() { // 无参
    return this.n++ // 满足要求
  }
}
console.log(a == 1 && a == 2 && a == 3) */



var c = {}
console.log(+c) // NaN
console.log(`${c}`) // '[object Object]'
console.log(c == 1) // false
console.log('---- 分割线 ----\n\n\n')


/* 接着研究 [Symbol.toPrimitive](hint)
如果没有定义 [Symbol.toPrimitive]，JavaScript 会依次调用 valueOf() 和 toString() 方法进行转换
语言并不强制 hint 与结果类型对齐，但 [Symbol.toPrimitive]() 必须返回原始类型，否则会抛出 TypeError 。 */
var b = {
  [Symbol.toPrimitive](hint) {
    console.log('hint:', hint)
    return;
  }
}
// +运算符, 转number, hint 收到 "number" → 转换提示：数字
console.log(+b) // NaN
console.log(+undefined) // NaN
console.log('---- 分割线 ----\n\n\n')

// 模板字符串, 转string, hint 收到 "string" → 转换提示：字符串
console.log(`${b}`) // 'undefined'
console.log(String(undefined)) // 'undefined'
console.log('---- 分割线 ----\n\n\n')

// 当运算符类型不确定时, hint 收到 "default" → 默认转换提示
console.log(b == 1) // false
console.log(undefined == 1) // false

console.log(b + '') // 'undefined'
console.log(undefined + '') // 'undefined'