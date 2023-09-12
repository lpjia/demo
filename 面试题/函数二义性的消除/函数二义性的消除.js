/* 函数二义性的消除
用class来代替构造函数的写法, 创建对象
普通函数用new.target来消除, 直接调用时, new.target为undefined
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target */


class fnClass { }
new fnClass()


function fn() {
  if (new.target) {
    throw new Error('只能使用普通函数的方式来调用')
  }
}
fn()
// new fn()


// 箭头函数不能new, 直接语言层面报错
const arrow = () => { }
new arrow()