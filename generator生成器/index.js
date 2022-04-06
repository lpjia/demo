function* gen() {
  yield 10;
  let x = yield 'foo';
  yield x;
}
let genObj = gen()
console.log('genObj.next():', genObj.next())
console.log('genObj.next():', genObj.next())
// 调用 next()方法时，如果传入了参数，那么这个参数会传给上一条执行的 yield语句左边的变量，例如例子中的 x 
console.log('genObj.next(30):', genObj.next(30))
console.log('genObj.next():', genObj.next())
console.log('---- 分割线 ----\n\n\n')


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
console.log('genObj2.next():', genObj2.next())
console.log('genObj2.next():', genObj2.next())
console.log('genObj2.next(50):', genObj2.next(50))
console.log('genObj2.next():', genObj2.next())
console.log('---- 分割线 ----\n\n\n')





function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);// 移交执行权
  yield i + 10;
}

let gen3 = generator(10);

console.log(gen3.next().value); // 10
console.log(gen3.next().value); // 11
console.log(gen3.next().value); // 12
console.log(gen3.next().value); // 13
console.log(gen3.next().value); // 20
console.log('---- 分割线 ----\n\n\n')



function* yieldAndReturn() {
  yield "Y";
  return "R";//显式返回处，可以观察到 done 也立即变为了 true
  yield "unreachable";// 不会被执行了
}

let gen4 = yieldAndReturn()
console.log(gen4.next()); // { value: "Y", done: false }
console.log(gen4.next()); // { value: "R", done: true }
console.log(gen4.next()); // { value: undefined, done: true }