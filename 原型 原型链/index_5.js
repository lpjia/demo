const person2 = { name: '林三心', age: 10 }

const person3 = new Object()
person3.name = '林三心'
person3.age = 10

console.log(Object.prototype === person2.__proto__) // true
console.log(Object.prototype === person3.__proto__) // true