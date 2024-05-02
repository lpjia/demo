/* instanceof只能检查对象是否是指定类型的实例，不能检查基本数据类型（如字符串、数字、布尔值等） */

console.log('{} instanceof Object:', {} instanceof Object) // true
console.log('null instanceof Object:', null instanceof Object) // false


/* 判断数组不能用 instanceof
而要用 Array.isArray() */
console.log('[] instanceof Object:', [] instanceof Object) // true
console.log('[] instanceof Array:', [] instanceof Array) // true


console.log('(new Map()) instanceof Map:', (new Map()) instanceof Map) // true
console.log('(new WeakMap()) instanceof WeakMap:', (new WeakMap()) instanceof WeakMap) // true
console.log('(new Set()) instanceof Set:', (new Set()) instanceof Set) // true
console.log('(new WeakSet()) instanceof WeakSet:', (new WeakSet()) instanceof WeakSet) // true


/* 1 instanceof Number 原始数据类型的字面量会返回false
而用包装器包一层后, 就可以正常使用 instanceof */
console.log('1 instanceof Number:', 1 instanceof Number) // false
console.log('(new Number(1)) instanceof Number:', (new Number(1)) instanceof Number) // true
console.log('(new Number(NaN)) instanceof Number:', (new Number(NaN)) instanceof Number) // true
console.log('(new Number(Infinity)) instanceof Number:', (new Number(Infinity)) instanceof Number) // true


console.log('true instanceof Boolean:', true instanceof Boolean) // false
console.log('(new Boolean(true)) instanceof Boolean:', (new Boolean(true)) instanceof Boolean) // true


/* bigint 比较特殊, 由于其没有构造器, 所以无法包装 */
console.log('80n instanceof BigInt:', 80n instanceof BigInt) // false
console.log('(BigInt(20)) instanceof BigInt:', (BigInt(20)) instanceof BigInt) // false


/* symbol 比较特殊, 由于其没有构造器, 所以无法包装 */
console.log('(Symbol(1)) instanceof Symbol:', (Symbol(1)) instanceof Symbol) // false