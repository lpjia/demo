class User_3 extends User_2 {
  constructor(nameIs, earLength) {
    super(nameIs) // 继承父类的 constructor
    // 继承父类后才可以用 this
    this.earLength = earLength
  }

  hide() {
    console.log(`${this.nameIs_4} hides!`);
  }

  stop() {
    super.stop() // 调用父类的 stop
    this.hide()
  }
}
let user_3 = new User_3('jack_3', 2)

console.log(user_3.nameIs_2)
console.log(user_3.nameIs_3)
console.log(user_3.nameIs_4)

user_3.run(10)
user_3.stop()

console.log(user_3.earLength)

console.log("User_3.prototype.__proto__ === User_2.prototype: ", User_3.prototype.__proto__ === User_2.prototype);
console.log('---- 分割线 ----\n\n\n')




class User_4 extends User_3 {
  username = 'user4'

  // 为没有自己的 constructor 的扩展类生成的
  // constructor(...args) {
  //   super(...args);
  // }
  // 它调用了父类的 constructor，并传递了所有的参数。如果我们没有写自己的 constructor，就会出现这种情况
  // 隐式调用了
  // 有自己需求也可以重写 constructor
  
  canUseThis(){
    console.log(this.username);
    console.log(this.speed);
    return '可以使用 this.xxx'
  }

  canUseSuper() {
    // console.log(this.username);
    super.hide()
    return '可以使用 super.xxx'
  }
}
const user_4 = new User_4('jack_4', 4)
console.log(user_4);
console.log(user_4.canUseThis())
console.log(user_4.canUseSuper())
console.log('---- 分割线 ----\n\n\n')
