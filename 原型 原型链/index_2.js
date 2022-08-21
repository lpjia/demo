// https://juejin.cn/post/7007416743215759373

// prototype: 显式原型
// __proto__: 隐式原型

// 构造函数的prototype和其实例的__proto__是指向同一个地方的, 叫原型对象

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
console.log(Person.prototype) // { sayName: [Function] }

const person1 = new Person('小明', 20)
console.log(person1.__proto__) // { sayName: [Function] }

const person2 = new Person('小红', 30)
console.log(person2.__proto__) // { sayName: [Function] }

console.log(Person.prototype === person1.__proto__) // true
console.log(Person.prototype === person2.__proto__) // true