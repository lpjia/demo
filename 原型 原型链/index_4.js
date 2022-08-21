// 第一种：构造函数创建对象
function Person(name, age) {
  this.name = name
  this.age = age
}
const person1 = new Person('林三心', 10)
console.log(person1) // Person { name: '林三心', age: 10 }

// 第二种：字面量创建对象
const person2 = { name: '林三心', age: 10 }
console.log(person2) // { name: '林三心', age: 10 }

// 第三种：new Object创建对象
const person3 = new Object()
person3.name = '林三心'
person3.age = 10
console.log(person3) // { name: '林三心', age: 10 }

// 第四种：Object.create创建对象
const person4 = Object.create({})
person4.name = '林三心'
person4.age = 10
console.log(person4) // { name: '林三心', age: 10 }