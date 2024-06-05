Function.prototype.myBind = function (ctx, ...args) {
  /* 拿到this
  谁调用myBind方法, 谁就是this */
  const fn = this
  /* 返回一个新函数 */
  return function (...newArgs) {
    /* 判断是不是通过new来调用 */
    if (new.target) {
      return new fn(...args, ...newArgs)
    }
    return fn.apply(ctx, [...args, ...newArgs])
  }
}


function fction(a, b, c, d, e) {
  console.log('fction called')
  console.log('args:', a, b, c, d, e)
  console.log('this:', this)
  return 'fan_hui'
}

// const newFction = fction.bind('content', 4, 5)
const newFction = fction.myBind('content', 4, 5, 6)

newFction(2, 3)
// console.log(newFction(2, 3))
// console.log(new newFction(2, 3))