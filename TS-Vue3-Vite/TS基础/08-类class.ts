export { }

/* 可以看
class_es6 类字段.js
来对比js和ts的类的区别 */


// 声明类的同时, 也会创建一个同名的类型(实例的类型)
class Person {
  myName: string
  myAge: number = 18 // 不需要构造函数也能赋初始值

  // 类的构造函数中使用解构constructor({age}:{age:number}){}
  // 不能直接用constructor({ name:string }){}, 这样是解构后重命名的语法
  constructor({ name, age, gender }:
    {
      name: string,
      age?: number,
      gender?: string
    }
  ) {
    this.myName = name
  }

  // getName():string { // 不写也行, 会自动推断
  getName() {
    return this.myName
  }

  getAge() {
    return this.myAge
  }

  // 可选成员
  sayHi?() { }

  // 手动声明类型
  jump2?: () => void = () => { }

  // 推导类型
  jump?= () => {
    console.log('this:', this) // this指向这个类, 没问题
  }

  // 异步
  jump4 = async () => {
    await 1
  }

  /* 这种写法需要手动指定this类型, 否则会波浪线报错, 不推荐, 推荐jump类成员的语法 */
  // jump3 = function () {
  //   console.log('this:', this)
  // }

  testThis() {
    console.log('testThis this:', this) // this指向这个类, 没问题

    /* 在koa的controller类中, 这样调用方法, this指向会报错, 提示this是undefined, 没有koa2_ts成员 */
    // this.koa2_ts()

    /* 写成这样就不报错, jump方法是类字段语法
    由于jump方法是可选成员, 所以调用时得加非空断言! */
    // this.jump!()
  }

  koa2_ts() {
    console.log('koa2_ts this:', this) // this指向这个类, 没问题
  }
}

let p = new Person({ name: 'xiaoming' })
console.log(
  // p.myName,
  // p.getName(),
  p.testThis(),
)




// let obj: Person = {
//   myName: '另一个对象的name',
//   myAge: 28,
//   getName() {
//     return '返回的是string'
//   },
//   getAge() {
//     return this.myAge
//   },
// }