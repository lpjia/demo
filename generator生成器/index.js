/* https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112
https://wangdoc.com/es6/generator.html
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*
https://www.runoob.com/w3cnote/es6-generator.html */


/* 生成器与迭代器

内置可迭代对象
String、Array、TypedArray、Map 和 Set 都是内置可迭代对象，因为它们的原型对象都拥有一个 Symbol.iterator 方法。

用于可迭代对象的语法
一些语句和表达式专用于可迭代对象，例如 for-of 循环、展开语法、yield* 和 解构赋值。

yield 暂停执行并返回当前值, 等待下次 `next()` 调用恢复
variable = yield expression, 传递给 .next() 函数的值将被赋值给 variable
next(param)的param被赋值给variable

占位 */


function* gen() {
  yield 10;
  let x = yield 'foo';
  yield x;
}
let genObj = gen()

// console.log(
//   genObj.next(), '\n', // { value: 10, done: false }
//   genObj.next(), '\n', // { value: 'foo', done: false }
//   genObj.next(30), '\n', // { value: 30, done: false }
//   genObj.next(40), '\n', // { value: undefined, done: true }
//   genObj.next(), '\n', // // { value: undefined, done: true }
// )


/**
 * 当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，
 * 即调用 next() 方法返回的对象的 done 为 true。
 * 如果 return 后面跟了一个值，那么这个值会作为当前调用 next() 方法返回的 value 值。
 */
function* gen2() {
  yield 10;
  let x = yield 'foo';
  yield x;
  return 'gen2()'
}
let genObj2 = gen2()

// console.log(
//   genObj2.next(), '\n', // { value: 10, done: false }
//   genObj2.next(), '\n', // { value: 'foo', done: false }
//   genObj2.next(50), '\n', // { value: 50, done: false }
//   genObj2.next(60), '\n', // { value: 'gen2()', done: true }
//   genObj2.next(), '\n', // // { value: undefined, done: true }
//   genObj2.next(), '\n', // // { value: undefined, done: true }
// )



function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
function* generator(i) {
  yield i;
  yield* anotherGenerator(i); // 移交执行权, yield* 会迭代执行另一个可迭代对象/生成器，逐个yield其值
  yield i + 10;
}
let gen3 = generator(10);

// console.log(
//   gen3.next().value, '\n', // 10
//   gen3.next().value, '\n', // 11
//   gen3.next().value, '\n', // 12
//   gen3.next().value, '\n', // 13
//   gen3.next().value, '\n', // 20
//   gen3.next(), '\n', // { value: undefined, done: true }
// )



function* yieldAndReturn() {
  yield "Y";
  return "R"; // 显式返回处，可以观察到 done 也立即变为了 true
  yield "unreachable"; // 不会被执行了
}
let gen4 = yieldAndReturn()

// console.log(
//   gen4.next(), '\n', // { value: "Y", done: false }
//   gen4.next(), '\n', // { value: "R", done: true }
//   gen4.next(), '\n', // { value: undefined, done: true }
// )