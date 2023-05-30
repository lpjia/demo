// 攻破思路就是从原型入手

// 闭包
var o = (function () {
  // 闭包保护了obj的完整性, 不会被外面修改
  var obj = {
    a: 1,
    b: 2,
  }
  // // 解决漏洞的方案二, 若没用到原型上的任何东西, 直接把原型设为null
  // Object.setPrototypeOf(obj, null)

  // 补充方案一
  Object.defineProperty(Object.prototype, "hasOwnProperty", {
    configurable: false, // 防止更改和删除属性标志，但是允许更改对象的值。
    writable: false, // 只读, 不允许该值
  })
  return {
    // // 原题目
    // get: function (k) {
    //   return obj[k] // 可以访问到obj原型上的成员, Object.prototype
    //   // return obj[k]() // 这就相当于调用obj.xxx方法, this指向没问题
    // }

    // 解决漏洞的方案一, 增加判断obj对象本身有无这个属性
    // 当重写原型的hasOwnProperty方法时, 还是可以攻破
    get: function (k) {
      if (obj.hasOwnProperty(k)) {
        return obj[k]
      }
      return undefined
    }
  }
})();
// 如何在不改变上面代码的情况下, 修改obj对象
console.log('o:', o)
// const val = o.get('a'); // 1
// const val = o.get('b'); // 2

// const val = o.get('valueOf'); // 拿到valueOf函数
// const val = o.get('valueOf')(); // 报错
/* 应该是obj.valueOf()语法, 现在是拿到这个valueOf函数本身, 用函数本身去调用, this指向会有问题 */
// const valueOf = Object.prototype.valueOf // 报错的那行语法, 相当于
// valueOf()

// js中访问某一个对象属性时, 直接是一个函数调用? 当属性是访问器的时候!
Object.defineProperty(Object.prototype, "abc", {
  get() {
    return this
  }
})

// 重写原型的hasOwnProperty方法
Object.defineProperty(Object.prototype, "hasOwnProperty", {
  // 这才是声明.hasOwnProperty方法, 即hasOwnProperty()
  value: function (k) {
    return true
  }
  // value: true // 这是声明.hasOwnProperty属性
})

// 读.abc相当于运行get方法(访问器), 返回这个对象
// obj对象上没有abc属性, 那么就会去原型上找, 找到返回this(obj对象)
const val = o.get('abc');
console.log('val:', val)
val.c = 3
val.a = 'aaa'
console.log(val, o.get('a'))


// 对象数据的valueOf方法会返回这个对象本身 return this
var obj = {
  a: 10,
  b: 20,
}
// Object.setPrototypeOf(obj, null) // 直接把原型设为null
console.log(
  obj.valueOf()
)