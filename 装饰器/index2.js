/* 通过扩展对象的原型来实现装饰者模式 */
// 定义一个原始对象
function Foo() { }

// 在原型上定义一个方法
Foo.prototype.foo = function () {
  console.log('foo');
}

// 定义一个装饰函数，用于扩展原型的方法
function barDecorator(clazz) {
  clazz.prototype.bar = function () {
    console.log('bar');
  }
}
function barDecorator2(clazz) {
  clazz.prototype.sayHello = function () {
    console.log('sayHello');
  }
}
function barDecorator3(clazz) {
  clazz.prototype.shuxing = 'shuxing';
}

// 使用装饰函数来扩展原型
barDecorator(Foo);
barDecorator2(Foo)
barDecorator3(Foo)

// 创建一个新的对象，并使用扩展后的方法
const obj = new Foo();
obj.foo(); // 输出 "foo"
obj.bar(); // 输出 "bar"
obj.sayHello()
console.log(obj.shuxing)