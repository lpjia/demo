function Person(name) { // 构造函数
  this.name = name
}
const person = new Person('林三心') // 实例

/* A instanceof B
B的prototype是否在A的原型链上 */

console.log(Person instanceof Function) // true
// Function.prototype, B的prototype
/* 
Person.__proto__ === Function.prototype
↓
Function.prototype.__proto__ === Object.prototype
↓
Object.prototype.__proto__ === null

A的原型链: Person -> Function.prototype -> Object.prototype -> null */



console.log(Person instanceof Object) // true
// Object.prototype, B的prototype
/* 
Person.__proto__ === Function.prototype
↓
Function.prototype.__proto__ === Object.prototype
↓
Object.prototype.__proto__ === null

A的原型链: Person -> Function.prototype -> Object.prototype -> null */



console.log(person instanceof Person) // true
// Person.prototype, B的prototype
/* 
person.__proto__ === Person.prototype
↓
Person.prototype.__proto__ === Object.prototype
↓
Object.prototype.__proto__ === null

A的原型链: person -> Person.prototype -> Object.prototype -> null */



console.log(person instanceof Object) // true
// Object.prototype, B的prototype
/* 
person.__proto__ === Person.prototype
↓
Person.prototype.__proto__ === Object.prototype
↓
Object.prototype.__proto__ === null

A的原型链: person -> Person.prototype -> Object.prototype -> null */
