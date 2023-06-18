var o = (function () {
  // 闭包保护了obj的完整性, 不会被外面修改
  var obj = {
    a: 1,
    b: 2,
  }

  // 补充方案一
  Object.defineProperty(Object.prototype, "hasOwnProperty", {
    configurable: false, // 防止更改和删除属性标志，但是允许更改对象的值。
    writable: false, // 只读, 不允许该值
  })

  return {
    get: function (k) {
      // 解决漏洞的方案一, 增加判断obj对象本身有无这个属性
      // 当重写原型的hasOwnProperty方法时, 还是可以攻破
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        return obj[k]
      }
      return undefined
    }
  }
})();
// 如何在不改变上面代码的情况下, 修改obj对象

Object.defineProperty(Object.prototype, "abc", {
  get() {
    return this
  }
})
Object.defineProperty(Object.prototype, "hasOwnProperty", {
  // 这才是声明.hasOwnProperty方法, 即hasOwnProperty()
  value: function (k) {
    return true
  }
  // value: true // 这是声明.hasOwnProperty属性
})

// 读.abc相当于运行get方法(访问器), 返回这个对象
// obj对象上没有abc属性, 那么就会去原型上找, 找到返回this(obj对象)
const val = o.get('abc')
console.log('val:', val)
val.c = 3
val.a = 'aaa'
console.log(val, o.get('a'))