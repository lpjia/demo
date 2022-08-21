function Person(name) { // 构造函数
  this.name = name
}

const person = new Person('林三心') // 实例

console.log(Person instanceof Function) // true
console.log(Person instanceof Object) // true
console.log(person instanceof Person) // true
console.log(person instanceof Object) // true
// A instanceof B
// 判断B的prototype是否在A的原型链上