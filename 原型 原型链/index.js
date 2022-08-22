// 原型对象
let Student = {
  name: 'Robot',
  height: 1.6,
  run() {
    console.log(this.name + ' is running...')
    return 'this is the way'
  }
}

let xiaoming = {
  name: '小明'
}

xiaoming.__proto__ = Student
console.log(xiaoming.name)
console.log(xiaoming.run())
console.log('---- 分割线 ----\n\n\n')



// 以 Student 对象来作为原型对象
// 以 null 来作为原型对象, 则基于它创建的新实例则没有原型链
const stud = Object.create(Student)
// const stud = Object.create(null)
console.log(stud.toString());
console.log(stud)
console.log('---- 分割线 ----\n\n\n')




function createStudent(name) {
  // 基于 Student 原型创建一个新对象
  let s = Object.create(Student)
  // 初始化新对象
  s.name = name
  return s
}

let xm = createStudent('小明2')
console.log(xm.run())
console.log(xm)
// 基于 Student 原型, 所以 ===
console.log(xm.__proto__ === Student)
console.log('---- 分割线 ----\n\n\n')




// 链式操作
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