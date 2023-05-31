export { }


// 如果 readonly 和其他访问修饰符同时存在的话，readonly放后面
// public readonly myName: string

// 访问权限修饰符: private public protected
// protected: 受保护的成员, 只能在自身(也是类)和子类中访问


class Person {
  // 成员默认的访问权限修饰符public, 可以不写
  public myName: string

  // 私有成员
  private myWeight: number = 50

  // 静态属性
  static title: string = '这是title'

  // 不需要传参赋值就可以不写构造函数
  constructor(name: string) {
    this.myName = name
  }

  getWeight() {
    return `${this.myWeight}kg`
  }

  // 类修饰符protected
  protected getName() {
    return this.myName
  }

  // 静态方法
  // 里面用this访问的成员只能是静态属性和静态方法
  static log() {
    console.log('静态方法log')
    return typeof this.log
  }
  // 用类访问则随意(因为类访问的只能是静态成员)
  static callClassLog() {
    Person.log()
  }
}

// 继承父类
class Male extends Person {
  age: number

  constructor(name: string, age: number) {
    super(name) // 调用父类的constructor, 并把参数传进去
    this.age = age
  }

  // 子类方法名和父类方法名一样, 重写了该方法, 并且public了
  getName() {
    // 返回的类型要和父类的返回类型一致
    return '某人叫: ' + this.myName
  }
}

const p = new Person('人')
// p.getName() // 报错, 属性“getName”受保护，只能在类“Person”及其子类中访问。

let man = new Male('xiaohuang', 18)
console.log(man.myName)
console.log(man.getName())
console.log(man.age)
// console.log(man.myWeight) // 报错, 属性“myWeight”为私有属性，只能在类“Person”中访问。
console.log(man.getWeight())


console.log(Person.title)
console.log(Person.log())
console.log(Person.callClassLog())