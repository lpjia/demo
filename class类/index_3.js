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
console.log('---- 分割线 ----\n\n\n')