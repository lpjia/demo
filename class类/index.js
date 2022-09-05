class User {
  constructor(nameIs) {
    this.nameIs = nameIs
  }

  sayHi() {
    console.log('this.nameIs:', this.nameIs)
  }
}
let user = new User('jack')
user.sayHi()

console.log(typeof User)
console.log(User === User.prototype.constructor)
console.log(User.prototype.sayHi)
console.log(Object.getOwnPropertyNames(User.prototype))
console.log('---- 分割线 ----\n\n\n')




class User_2 {
  nameIs_2 = 'nameIs_2'

  constructor(nameIs) {
    this.nameIs_3 = 'nameIs_3'
    this.nameIs_4 = nameIs
  }

  sayHi() {
    console.log('this.nameIs_2:', this.nameIs_2)
    console.log('this.nameIs_3:', this.nameIs_3)
    console.log('this.nameIs_4:', this.nameIs_4)
  }
}
let user_2 = new User_2('jack_2')
user_2.sayHi()

console.log(user_2.nameIs_2)
console.log(user_2.nameIs_3)
console.log(user_2.nameIs_4)
console.log('---- 分割线 ----\n\n\n')




class User_3 extends User_2 {
  constructor(nameIs) {
    super(nameIs)
  }
}
let user_3 = new User_3('jack_3')
user_3.sayHi()

console.log(user_3.nameIs_2)
console.log(user_3.nameIs_3)
console.log(user_3.nameIs_4)
console.log(User.prototype.nameIs)