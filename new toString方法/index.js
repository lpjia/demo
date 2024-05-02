
console.log('Object.prototype.toString.call() 返回的是字符串')

console.log('1:', Object.prototype.toString.call(1)) // '[object Number]'
console.log('NaN:', Object.prototype.toString.call(NaN))

console.log('"abc":', Object.prototype.toString.call('abc')) // '[object String]'

console.log('true:', Object.prototype.toString.call(true)) // '[object Boolean]'

console.log('null:', Object.prototype.toString.call(null)) // '[object Null]'

console.log('undefined:', Object.prototype.toString.call(undefined)) // '[object Undefined]'

console.log('Symbol():', Object.prototype.toString.call(Symbol())) // '[object Symbol]'

console.log('100n:', Object.prototype.toString.call(100n)) // '[object BigInt]'

console.log('{}:', Object.prototype.toString.call({})) // '[object Object]'

console.log('[]:', Object.prototype.toString.call([])) // '[object Array]'

console.log('new Map():', Object.prototype.toString.call(new Map())) // '[object Map]'

console.log('new WeakMap():', Object.prototype.toString.call(new WeakMap())) // '[object WeakMap]'

console.log('new Set():', Object.prototype.toString.call(new Set())) // '[object Set]'

console.log('new WeakSet():', Object.prototype.toString.call(new WeakSet())) // '[object WeakSet]'

console.log('new Function():', Object.prototype.toString.call(new Function())) // '[object Function]'

/* Proxy 不能用 toString 方法来判断
找到一个取巧的办法
https://juejin.cn/post/6865910564817010702 */