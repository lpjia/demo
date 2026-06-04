function Person(name) { // 构造函数
  this.name = name
}
Person.prototype.sayName = function () { // 往"原型对象"添加方法
  console.log(this.name)
}
const person = new Person('林三心') // 实例obj
// 使用构造函数的prototype中的方法
person.sayName() // 林三心
console.log('---- 分割线 111 ----\n\n\n')


/* 原型链, 记忆
实例obj的__proto__ 指向"原型对象"

person.__proto__ === Person.prototype
↓
Person.prototype.__proto__ === Object.prototype
↓
Object.prototype.__proto__ === null
看===右边就清楚原型链了

原型链: person -> Person.prototype -> Object.prototype -> null */


Object.prototype.fnObject = function (one, two, three) {
  console.log('this is fnObject()',)
  console.log('实参个数:', arguments.length)
}
person.fnObject() // fnObject 方法来自 person -> Person.prototype -> Object.prototype
console.log('形参个数:', person.fnObject.length) // 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
// 实参0个, 形参3个
console.log('---- 分割线 222 ----\n\n\n')




Number.prototype.fnNumber = function (one, two = 'param_2', three) {
  console.log('this is fnNumber()')
  console.log('实参个数:', arguments.length)
}
const num = new Number()
console.log(num)
num.fnNumber() // fnNumber 方法来自 num -> Number.prototype
console.log('形参个数:', num.fnNumber.length) // 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
// 实参0个, 形参1个
console.log('---- 分割线 333 ----\n\n\n')




Function.prototype.fnFunction = function (one, two, ...rest) {
  console.log('this. is fnFunction()')
  console.log('实参个数:', arguments.length)
}
const fn = new Function()
console.log(fn)
fn.fnFunction() // fnFunction 方法来自 fn -> Function.prototype
console.log('形参个数:', fn.fnFunction.length) // 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
// 实参0个, 形参2个
console.log('---- 分割线 444 ----\n\n\n')




// Symbol 作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"
// 但还是可以查看 Symbol.prototype
Symbol.prototype.fnSymbol = function () {
  console.log('this is fnSymbol()')
}
console.log(Symbol.prototype)

// 围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 
// 字面量、包装obj
// 然而，现有的原始包装器对象，如 new Boolean、new String以及new Number，因为遗留原因仍可被创建。
const symb = Symbol('symb')
console.log(symb)
// 如果你真的想创建一个 Symbol 包装器对象 (Symbol wrapper object)，你可以使用 Object() 函数
const objSymb = Object(symb)
console.log(objSymb)
console.log(objSymb.__proto__ === Symbol.prototype) // true
/* 
objSymb.__proto__ === Symbol.prototype
↓
Symbol.prototype.__proto__ === Object.prototype
↓
Object.prototype.__proto__ === null

原型链: objSymb -> Symbol.prototype -> Object.prototype -> null */
