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

class Rabbit_2 extends Object {
  constructor(name) {
    super()
    this.name = name
  }
}
let rabbit_2 = new Rabbit_2('Rab')
console.log(rabbit_2.hasOwnProperty('name'))
console.log('---- 分割线 ----\n\n\n')