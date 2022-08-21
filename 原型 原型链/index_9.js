function Person(name) { // 构造函数
  this.name = name
}
Person.prototype.sayName = function () { // 往原型对象添加方法
  console.log(this.name)
}


const person = new Person('林三心') // 实例
// 使用构造函数的prototype中的方法
person.sayName() // 林三心



// 确定原型链走向, 并验证"函数对象"的 length 属性
Object.prototype.fnObject = function (one, two, three) {
  console.log('this is fnObject()')
}
person.fnObject()


// Number.prototype 的原型指向 Object.prototype
Number.prototype.fnNumber = function (one, two = 'param_2', three) {
  console.log('this is fnNumber()')
}


Function.prototype.fnFunction = function (one, two, ...rest) {
  console.log('this. is fnFunction()')
}

console.log(new Number())



// Symbol 作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"
// 但还是可以查看 Symbol.prototype  
Symbol.prototype.fnSymbol = function (one, ...rest) {
  console.log('this is fnSymbol()')
}

// 围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 
// 然而，现有的原始包装器对象，如 new Boolean、new String以及new Number，因为遗留原因仍可被创建。
const symb = Symbol('symb')
console.log(symb)
// 如果你真的想创建一个 Symbol 包装器对象 (Symbol wrapper object)，你可以使用 Object() 函数
console.log(Object(symb))
// console.log(Symbol.prototype)