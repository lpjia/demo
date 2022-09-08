let num = 10
class User {
  // 类字段, 会在每个独立对象中被设好, 而不是设在 User.prototype
  age = 30

  constructor(nameIs) {
    this.nameIs = nameIs

    this.name_1 = nameIs
  }

  sayHi() {
    console.log('this.nameIs:', this.nameIs)
  }

  sayYes() {
    console.log('this is sayYes(), this.age = ', this.age);
  }

  get name_1() {
    return this._xxx
  }
  set name_1(val) {
    if (val.length < 4) {
      console.log('name_1 is too short');
      return;
    }
    this._xxx = val // 为啥这个 xxx 没有声明就可以直接用呢?
    // 名义上的私有属性 https://zhuanlan.zhihu.com/p/489193969
  }

  [`happy_${num}`]() {
    console.log('this is happy_' + num + '()');
  }

  [Symbol('symbol属性')]() {
    console.log('this is symbol属性');
  }
}
// getOwnPropertyNames 方法只包含类的方法和 User.prototype 的属性和方法
User.prototype.gender = ''
User.prototype.like = function () {
  console.log('喜欢什么呢');
}

let user = new User('jack')
user.sayHi()

function People() { }

console.log(user);

console.log(typeof User)
console.log('typeof People:', typeof People);

console.log(User.prototype.constructor === User)
console.log(User.prototype.sayHi)

// 类字段, 会在每个独立对象中被设好, 而不是设在 User.prototype
console.log(user.age); // 30
console.log(User.prototype.age); // undefined

// Object.getOwnPropertyNames
// 返回一个由指定对象的所有自身属性的属性名
//（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。
console.log(Object.getOwnPropertyNames(User.prototype))
console.log(Object.keys(User.prototype));
console.log(Object.keys(user));

console.log(new User(''));

console.log(user[`happy_${num}`]);

user.sayYes()

console.log('---- 分割线 ----\n\n\n')