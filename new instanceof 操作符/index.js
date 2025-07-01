/* instanceof只能检查对象是否是指定类型的实例，不能检查基本数据类型（如字符串、数字、布尔值等） 

A instanceof B
判断B的prototype是否在A的原型链上*/

console.log(
  {} instanceof Object, // true
  null instanceof Object // false
)


/* 判断数组不能用 instanceof
而要用 Array.isArray() */
console.log(
  [] instanceof Object, // true
  [] instanceof Array, // true
  Array.isArray([]) // true
)


console.log(
  (new Map()) instanceof Map, // true
  (new Map()) instanceof Object, // true
  (new WeakMap()) instanceof WeakMap, // true
  (new WeakMap()) instanceof Object, // true
  (new Set()) instanceof Set, // true
  (new WeakSet()) instanceof WeakSet, // true
)


/* 1 instanceof Number 原始数据类型的字面量会返回false
而用包装器包一层后, 就可以正常使用 instanceof */
console.log(
  1 instanceof Number, // false
  (new Number(1)) instanceof Number, // true
  (new Number(NaN)) instanceof Number, // true
  (new Number(Infinity)) instanceof Number, // true
)


console.log(
  true instanceof Boolean, // false
  (new Boolean(false)) instanceof Boolean // true
)


/* bigint 比较特殊, 由于其没有构造器, 所以无法包装
symbol 也是 */
console.log(
  80n instanceof BigInt, // false
  (BigInt(20)) instanceof BigInt, // false

  (Symbol(1)) instanceof Symbol // false
)