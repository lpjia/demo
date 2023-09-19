class Example {
  constructor(name) {
    this.name = name
  }

  fn() {
    console.log(this.name)
  }
}

let example = new Example('类创建的')
// let example = Example('类创建的')
console.log(example)
example.fn()


for (const key in example) {
  console.log(key)
}


// let example2 = new example.fn()
let example2 = example.fn()


// ES6中类语法在严格模式下
// 类的构造器不能直接调用, 得用new来调用
// 类的原型上的方法成员不能被枚举
// 类的实例上的方法也不能用new调用