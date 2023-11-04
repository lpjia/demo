/* 可以看
ts基础 08-类class.ts
来对比js和ts的类的区别 */

class User {
  /* 类字段, 会在每个独立对象中被设好, 而不是设在 User.prototype */
  gender = 'male'

  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`${this.name} sayHi, gender is ${this.gender}`)
    this.jump()
  }

  /* 类字段, 用= */
  jump = function () {
    console.log('this:', this)
  }
  // 2个this都指向User类
  jump2 = () => {
    console.log('this:', this)
  }
  /* 不能写成下面这样, 这是对象成员的语法/ts类型标注的语法 */
  // j: function(){}
}

let user = new User('jack')
console.log(
  // user,
  user.sayHi(),
)

/* 对象成员 */
let obj = {
  a: function (params) { },
  b: function (params) { }
}