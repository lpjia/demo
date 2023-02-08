export { }

class Person {
  // 类修饰符public, 类里面 子类 类外面都可以访问
  public myName: string

  // // 类修饰符private, 类里面才可以访问, 类外面 子类不可访问
  // private myName: string

  // // 类修饰符protected, 类里面 子类可以访问, 类外面不可访问
  // protected myName: string

  // // 修饰符readonly, 只读, 给属性用
  // readonly myName: string
  // // 如果 readonly 和其他访问修饰符同时存在的话，readonly放后面
  // public readonly myName: string

  constructor(name: string) {
    this.myName = name
  }

  protected getName() {
    return this.myName
  }
}


class Male extends Person {
  age: number

  constructor(name: string, age: number) {
    super(name) // 调用父类的constructor, 并把参数传进去
    this.age = age
  }

  // 子类方法名和父类方法名一样, 重写了该方法
  getName() {
    // 返回的类型要和父类的返回类型一致
    return '某人叫: ' + this.myName
  }
}

let man = new Male('xiaohuang', 18)
console.log(man.myName)
console.log(man.age)
console.log(man.getName())