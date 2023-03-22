/* 前端设计模式——装饰者模式 */

/* 通过扩展对象的属性或方法来实现装饰者模式 */
// 定义一个原始对象
const obj = {
  foo() {
    console.log('foo');
  }
}

// 定义一个装饰函数，用于扩展原始对象的方法
function barDecorator(obj) {
  obj.bar = function () {
    console.log('bar');
  }
  return obj;
}

// 使用装饰函数来扩展原始对象
const decoratedObj = barDecorator(obj);
decoratedObj.foo(); // 输出 "foo"
decoratedObj.bar(); // 输出 "bar"