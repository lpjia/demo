export { }

// 声明类的同时, 也会创建一个同名的类型(实例的类型)
class Person {
  myName: string

  constructor(name: string) {
    this.myName = name
  }

  getName() {
    return this.myName
  }
}

let p = new Person('xiaoming')
console.log(p.myName)
console.log(p.getName())




let obj: Person = {
  myName: '',
  getName() {
    return ''
  }
}