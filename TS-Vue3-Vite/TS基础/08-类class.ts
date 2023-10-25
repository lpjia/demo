export { }

// 声明类的同时, 也会创建一个同名的类型(实例的类型)
class Person {
  myName: string
  myAge: number = 18 // 不需要构造函数也能赋初始值

  // 类的构造函数中使用解构constructor({age}:{age:number}){}
  // 不能直接用constructor({ name:string }){}, 这样是解构后重命名的语法
  constructor({ name, age, gender }:
    {
      name: string,
      age?: number,
      gender?: string
    }
  ) {
    this.myName = name
  }

  // getName():string { // 不写也行, 会自动推断
  getName() {
    return this.myName
  }

  getAge() {
    // this.jump!()
    return this.myAge
  }

  // 可选成员
  sayHi?() { }

  // 手动声明类型
  jump2?: () => void = () => { }

  // 推导类型
  jump?= () => {
    console.log('this:', this)
  }
}

let p = new Person({ name: 'xiaoming' })
console.log(p.myName)
console.log(p.getName())




let obj: Person = {
  myName: '另一个对象的name',
  myAge: 28,
  getName() {
    return '返回的是string'
  },
  getAge() {
    return this.myAge
  },
}