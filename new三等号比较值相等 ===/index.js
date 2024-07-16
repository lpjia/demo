/* 全局搜索 三等号 */

const o1 = {}
const o2 = o1

const s1 = Symbol('xxx')
const s2 = s1

console.log(
  // 'abc' === 'abc', // true
  // 1 === 1, // true
  // true === true, // true

  // null === null, // true
  // undefined === undefined, // true

  // {} === {}, // false, 栈存的是对象地址, 地址不一样
  // [] === [], // false, 栈存的是对象地址, 地址不一样
  // o1 === o2, // true, 俩地址一样

  // BigInt(10) === BigInt(10), // true
  // 20n === 20n, // true
  // 30 === 30n, // false

  // +0 === -0, // true, 不符合逻辑
  // NaN === NaN, // false, 不符合逻辑

  // Symbol('xxx') === Symbol('xxx'), // false, 本身值是独一无二的
  // s1 === s1, // true
)



/* 几种严格相等
Object.is(x, y) 推荐
arr.includes() 和 new Set()
===

区别是
=== 对带符号的0看作是相等, 对NaN看作是不等, 讲道理两个都是有问题的
arr.includes() 和 new Set(), 对NaN看作是相等, 其他和===一样
Object.is() 0不等于-0, NaN看作是相等, 符合逻辑

0和+0是一样的, 但是-0和0不一样, 因为1/0=Infinity, 1/-0=-Infinity, 正负无穷大, 是两个数
换行占位 */


// 三等号
null === null; // true
undefined === undefined; // true
/* === 对下面2个判断有问题 */
NaN === NaN; // false
+0 === -0; // true

new Set([0, +0, -0]); // Set(1) {0}




// 案例 1：评估结果和使用 === 相同
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// 案例 2: 带符号的 0
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// 案例 3: NaN
Object.is(NaN, 0 / 0); // true, 0/0是NaN
Object.is(NaN, Number.NaN); // true