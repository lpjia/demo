var o = (function () {
  // 闭包保护了obj的完整性, 不会被外面修改
  var obj = {
    a: 1,
    b: 2,
  }
  return {
    get: function (k) {
      return obj[k]
    }
  }
})();
// 如何在不改变上面代码的情况下, 修改obj对象

// 攻破思路就是从原型入手
console.log('o:', o)
console.log(
  // o.get('a'),
  // o.get('valueOf'),
  // o.get('valueOf')(), // 报错
  /* 应该是obj.valueOf()语法, 现在是拿到这个valueOf函数本身, 用函数本身去调用, this指向会有问题 */
)
const person = { name: '小p' }
console.log(person.valueOf() === person) // true
// const valueOf = Object.prototype.valueOf // 报错的那行语法, 相当于
// valueOf()

// js中访问某一个对象属性时, 直接是一个函数调用?
// 当属性是访问器的时候!
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