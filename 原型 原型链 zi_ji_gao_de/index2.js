// https://juejin.cn/post/7007416743215759373

// prototype: 显式原型
// __proto__: 隐式原型

{
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  // Person.prototype "原型对象"
  Person.prototype.sayName = function () { // 往"原型对象"添加方法
    console.log(this.name)
  }
  console.log(Person.prototype) // { sayName: [Function] }

  const person1 = new Person('小明', 20)
  console.log(person1.__proto__) // { sayName: [Function] }

  const person2 = new Person('小红', 30)
  console.log(person2.__proto__) // { sayName: [Function] }

  console.log(Person.prototype === person1.__proto__) // true
  console.log(Person.prototype === person2.__proto__) // true
  console.log('---- 分割线 111 ----\n\n\n')
}


{
  function fn1(name, age) {
    console.log(`我是${name}, 我今年${age}岁`)
  }

  const fn2 = function (name, age) {
    console.log(`我是${name}, 我今年${age}岁`)
  }

  const arrowFn = (name, age) => {
    console.log(`我是${name}, 我今年${age}岁`)
  }

  console.log(Function.prototype === fn1.__proto__) // true
  console.log(Function.prototype === fn2.__proto__) // true
  console.log(Function.prototype === arrowFn.__proto__) // true
  console.log('---- 分割线 222 ----\n\n\n')
}


{
  // 第一种：构造函数创建对象
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  const person1 = new Person('林三心', 10)
  console.log(person1) // Person { name: '林三心', age: 10 }

  console.log(Person.prototype === person1.__proto__) // true
  console.log(Function.prototype === Person.__proto__) // Person = new Function() true
  console.log(Object.prototype === Function.prototype.__proto__) // true
  console.log(Object.prototype === Person.prototype.__proto__) // true

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
  console.log('---- 分割线 333 ----\n\n\n')
}



{
  function fn() { }

  console.log(fn.prototype) // {constructor: fn}
  console.log(fn.prototype.constructor === fn) // true
  /* 构造函数的 prototype, 叫"原型对象"
  "原型对象"的 constructor (构造器)
  构造函数的 prototype 的构造器指向构造函数自己 */
}
