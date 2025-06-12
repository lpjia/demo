function memoize(fn) {
  const cache = {};
  console.log('memoize 闭包前的 this:', this) // this指向window

  return function (...args) {
    console.log('memoize 闭包后的 this:', this) // 闭包的this指向正确

    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    /* 闭包(内层函数, this的值不会自动继承), 箭头函数没有自己的this
    保留this灵活性
    通过 fn.apply 改变fn调用时 fn内部的 this 值
    (this, args), 这个this是闭包的this, 不是fn内部的this
    fn内部的this指向, 通过apply显式绑定到闭包的this了 */
    const result = fn.apply(this, args);
    cache[key] = result;

    return result;
  };
}

function memoizeError(fn) {
  const cache = {};
  // this指向window
  return function (...args) {
    // this指向obj
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn(...args) // 直接调用fn
    console.log(this, 111)
    cache[key] = result;
    console.log(cache, 222)

    return result;
  };
}

const obj = {
  method: memoizeError(function (x) {
    // method: memoize(function (x) {
    console.log('this:', this)
    return x + this.value;
  }),
  value: 10
};
obj.method(5)
/* 分析正确过程
obj.method(5), 这个obj.xxx调用了, this指向obj
memoize() 直接调用, 闭包前的this指向window
memoize返回一个函数, 创建了闭包
返回的这个函数通过obj.method调用了, this指向obj, 闭包内的this也指向obj
闭包内的fn.apply(this, args)
  把闭包的this传递到fn内部, fn调用也就是function (x) {
    return x + this.value;
  } 调用, this.value的this指向闭包的this, 也就是指向obj
占位 */

