class User_2 {
  nameIs_2 = 'nameIs_2'
  #siyou = 'this is 私有属性'
  speed = 0

  constructor(nameIs) {
    // 与类字段的区别
    // 很容易看出需要哪些参数用来构造对象
    this.nameIs_3 = 'nameIs_3'

    this.nameIs_4 = nameIs

    // console.log(#siyou in this)
  }

  sayHi() {
    console.log('this.nameIs_2:', this.nameIs_2)
    console.log('this.nameIs_3:', this.nameIs_3)
    console.log('this.nameIs_4:', this.nameIs_4)
    // 语法要加 #
    console.log(this.#siyou, '内部可以取到');

    // undefined, 这种语法取不到私有字段, 就挺离谱的
    console.log(this['#siyou'])


    // 这是兼容性问题, chrome 91才支持, 我用的是 90
    // console.log(#siyou in this);
  }

  run(speed) {
    this.speed = speed
    console.log(`${this.nameIs_4} runs with speed ${this.speed}`);
  }

  stop() {
    this.speed = 0
    console.log(`${this.nameIs_4} stands still`);
  }
}
let user_2 = new User_2('jack_2')
user_2.sayHi()

console.log(user_2.nameIs_2)
console.log(user_2.nameIs_3)
console.log(user_2.nameIs_4)
// console.log(user_2.#siyou) // 报错
console.log('---- 分割线 ----\n\n\n')