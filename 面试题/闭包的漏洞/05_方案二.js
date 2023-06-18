var o = (function () {
  // 闭包保护了obj的完整性, 不会被外面修改
  var obj = {
    a: 1,
    b: 2,
  }

  // 解决漏洞的方案二, 若没用到原型上的任何东西, 直接把原型设为null
  Object.setPrototypeOf(obj, null)

  return {
    get: function (k) {
      return obj[k]
    }
  }
})();
// 如何在不改变上面代码的情况下, 修改obj对象

Object.defineProperty(Object.prototype, "abc", {
  get() {
    return this
  }
})

// 读.abc相当于运行get方法(访问器), 返回这个对象
// obj对象上没有abc属性, 那么就会去原型上找, 找到返回this(obj对象)
const val = o.get('abc')
console.log('val:', val)
val.c = 3
val.a = 'aaa'
console.log(val, o.get('a'))