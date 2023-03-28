class Rabbit {
  furColor
  weight
  size
  age

  eat() { }

  sleep() { }

  jump() { }
}
console.log(new Rabbit())

/* 两个类的写法区别就是不用构造函数, 可以明显的区分哪些属性是需要传参的 */

class Rabbit2 {
  constructor() {
    this.furColor = 1
    this.weight = 2
    this.size = 3
    this.age = 4
  }

  jump() { }
}
console.log(new Rabbit2())
console.log('---- 分割线 ----\n\n\n')


/* 实例成员和静态成员
类里面的属性和方法其实是实例成员, 针对某一个实例的
多个实例共用的东西, 统一写到类里面
类充当了公共模板
静态成员是带static声明的, 包括静态属性和静态方法 */

class Rabbit3 {
  static total = 100

  constructor(furColor, weight, size) {
    this.furColor = furColor
    this.weight = weight
    this.size = size
  }

  // 实例方法调用实例属性/方法
  jump() {
    console.log('jump')
    this.eat()
    console.log(this.weight)
  }
  eat() {
    console.log('eat')
  }

  // 实例方法调用静态属性/方法
  getTotal3() {
    // 实例成员
    this.eat() // 这是实例方法
    console.log(this.size) // 这是实例属性

    // 静态成员
    return this.constructor.getTotal2() + this.constructor.total // this.constructor 构造函数的
    // return Rabbit3.getTotal2() + 100 // Rabbit3 类的
  }

  // 静态方法调用静态属性/方法, 可以直接用this.xxx
  /* 静态方法里的作用域, this指向class类, 由于静态方法/属性可以这样写Rabbit3.xxx, 那么可以直接写成this.xxx
  静态方法本来就是静态成员而非实例成员
  静态方法不能调用实例方法/属性 */
  static getTotal() {
    // 以下两种写法都行, 推荐第一种
    return this.total + 100
    // return Rabbit3.total + 100
  }
  static getTotal2() {
    // 以下两种写法都行, 推荐第一种
    return this.getTotal() + 100
    // return Rabbit3.getTotal() + 100
  }
}
const r = new Rabbit3('white', '1kg', 'small')
console.log(r)
r.jump()
console.log('---- 分割线 ----\n\n\n')
/* 兔子的颜色是什么, 问的是哪一个兔子, new出来的obj
兔子的数量是多少, 问的是兔子的总数, 哪只兔子肯定没有这个东西, 所以是类的 */
console.log(Rabbit3.total)
console.log(Rabbit3.getTotal())
console.log(Rabbit3.getTotal2())
console.log(r.getTotal3())