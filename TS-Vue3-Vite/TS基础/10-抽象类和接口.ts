export { }

/* 抽象类是类的模板, 类(构造函数)是实例的模板 */
// 抽象类 是普通类的描述, 指定了一个类的规范, 给普通的类去继承
// 继承之后, 普通类里面就必须定义抽象类里面的抽象属性和抽象方法
// 抽象类里面的普通方法直接继承, 在普通类里面可以不用实现
// 抽象类不允许被实例化

// 主要用于提取子类共有的成员
abstract class Person {
  // 抽象属性
  abstract name: string

  // 抽象方法
  abstract getName(): string

  // 普通方法
  getAge() {
    return 18
  }
}

// // 抽象类不允许被实例化
// let p = new Person()


// 普通类
// 类只能继承一个抽象类
class Female extends Person {
  name: string = '女士'

  getName() {
    return this.name
  }
}
let women = new Female()
console.log(women)
console.log(women.getName())
console.log(women.getAge())





// 书写接口, 给类使用
interface PersonItf {
  name: string,
  age: number,
  getName: () => void
}

interface HumanItf {
  run: () => void
}

// 类可以实现(implements)多个接口
class M implements PersonItf, HumanItf {
  name = 'M类'
  readonly age = 22

  getName() {
    console.log('普通方法 getName')
    this.name = 'name被改了'
  }

  run() {
    console.log('普通方法 run')
  }
}

class Man extends M {

}
let m = new Man()
// m.age = 2