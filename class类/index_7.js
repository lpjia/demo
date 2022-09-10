// mixin 混入模式


// mixin
// 混入行为
const sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`)
  },

  sayBye() {
    console.log(`Bye ${this.name}`)
  }
}

// 用法
class Human {
  constructor(name) {
    this.name = name
  }
}

// 浅拷贝
Object.assign(Human.prototype, sayHiMixin)

new Human('lpjia').sayHi()



// mixin 可以在自己内部使用继承
const sayMixin_2 = {
  say(phrase) {
    console.log(phrase)
  }
}

const sayHiMixin_2 = {
  __proto__: sayMixin_2,

  sayHi() {
    // 调用父类方法
    super.say(`Hello ${this.name}`)
  },

  sayBye() {
    super.say(`Bye ${this.name}`)
  }
}

class Human_2 extends Human {
  // constructor(name) {
  //   this.name = name
  // }
}

Object.assign(Human_2.prototype, sayHiMixin_2)

new Human_2('lpjia_2').sayBye()

console.log('---- 分割线 ----\n\n\n')