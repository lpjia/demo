const Student = {
  name: 'Robot',
  height: 1.6,
  run() {
    console.log(this.name + ' is running...')
    return '这是returnValue'
  }
}

const xiaoming = {
  name: '小明'
}

/* 构造函数的 prototype 和其(构造函数)实例obj的 __proto__ 是指向同一个地方的, 叫"原型对象"
  Object.prototype === ({}).__proto__ // true
  一般说的"原型对象"指 Object.prototype, 也指构造函数的 prototype
占位 */

xiaoming.__proto__ = Student // Student在这作为"原型对象"
// 找属性, 先找自身, 自身找不到再去原型链上找, 还找不到就是 undefined
console.log(xiaoming.name) // '小明'
console.log(xiaoming.name2) // undefined
console.log(xiaoming.run())
console.log(xiaoming.height) // 1.6
console.log('---- 分割线 111 ----\n\n\n')



/* xiaoming.__proto__ = Student
  和这个效果一样的是
  const xiaoming2 = Object.create(Student)
占位 */
const xiaoming2 = Object.create(Student) // 把Student作为"原型对象", 创建新obj
// xiaoming2.name = '小明2'
console.log(xiaoming2.name)
console.log(xiaoming2.valueOf()) // valueOf 方法来自 xiaoming2 -> Student -> Object.prototype
console.log(Object.prototype) // 有 valueOf()

// 以 null 来作为"原型对象", 则直接到原型链终点null, 也就是没有原型链
const nullObj = Object.create(null)
console.log(nullObj.__proto__) // undefined
console.log('---- 分割线 222 ----\n\n\n')





// 工厂模式创建
function createStudent(name) {
  // 基于 Student "原型对象"创建一个obj
  const s = Object.create(Student)
  // 初始化新对象
  s.name = name
  return s
}

const xiaoming3 = createStudent('小明3')
console.log(xiaoming3.run())
console.log(xiaoming3)
console.log(xiaoming3.__proto__ === Student) // 基于 Student "原型对象", 所以 true
console.log('---- 分割线 333 ----\n\n\n')




// 链式操作, 核心就是setter返回this
function Person() { }
Person.prototype = {
  set(val) {
    this.val = val
    return this
  },
  get() {
    return this.val
  }
}
const p = new Person()
console.log(p.set(10).get())

// 使用类
class Person2 {
  set(val) {
    this.val = val
    return this
  }

  get() {
    return this.val
  }
}
const p2 = new Person2()
console.log(p2.set(10).get())

// 还有常见的写法
function Person3() { }
Person3.prototype.set = function (val) {
  this.val = val
  return this
}
Person3.prototype.get = function () {
  return this.val
}
const p3 = new Person3()
console.log(p3.set(10).get())
