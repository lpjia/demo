// static 静态

// 通常，静态方法用于实现属于整个类，但不属于该类任何特定对象的函数。
// 静态方法也被用于数据库相关的公共类, 可以用于搜索/保存/删除数据库中的条目
// 静态方法可以在类上调用, 而不是在单个对象上

// 静态属性

class Artical {
  static publisher = 'mouren'

  constructor(title, date) {
    this.title = title
    this.date = date
  }

  static createTodays() {
    return new this(`Today's digest`, new Date())
  }
}

let artical = Artical.createTodays()
// 不是一个文章的方法, 而是整个 class 的方法

console.log(artical.title)
console.log(artical.date)
console.log('---- 分割线 ----\n\n\n')






class Rabbit {
  constructor(name) {
    this.name = name
  }
}

let rabbit = new Rabbit('Rab')
console.log(rabbit.hasOwnProperty('name'))
console.log(rabbit.name);


// 子类构造函数调用super()方法
class Rabbit_2 extends Object {
  constructor(name) {
    super()
    this.name = name
  }
}
let rabbit_2 = new Rabbit_2('Rab_2')
console.log(rabbit_2.hasOwnProperty('name'))
console.log(rabbit_2.name);
console.log('---- 分割线 ----\n\n\n')



// “extends” 语法会设置两个原型
// 在构造函数的 "prototype" 之间设置原型（为了获取实例方法）。
// 在构造函数之间会设置原型（为了获取静态方法）。
console.log('“extends” 语法会设置两个原型');
console.log(Rabbit_2.prototype.__proto__ === Object.prototype);
// 把 Rabbit_2 构造函数的 __proto__ 指向了 Object 构造函数, 本来应该指向 Function.prototype
console.log(Rabbit_2.__proto__ === Object);
console.log(Rabbit_2.getOwnPropertyNames({a: 1, b: 2}));
// Object.getOwnPropertyNames() 是 Object 的静态方法, 不能用于实例


console.log('Rabbit 没有继承 Object');
console.log(Rabbit.prototype.__proto__ === Object.prototype);
console.log(Rabbit.__proto__ === Object);
// 所有函数都是默认如此
console.log(Rabbit.__proto__ === Function.prototype);
// console.log(Rabbit.getOwnPropertyNames({a: 1, b: 2})); // 报错, Rabbit 没有提供对 Object 的静态方法的访问

console.log('---- 分割线 ----\n\n\n')