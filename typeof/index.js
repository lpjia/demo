console.log('typeof 1:', typeof 1)
console.log('typeof typeof 1:', typeof typeof 1)
// typeof 返回的都是字符串
console.log('\n')


// 返回 'string'
console.log('typeof "aaa":', typeof "aaa")
console.log('\n')


// 返回 'number'
console.log('typeof 10:', typeof 10)
// NaN 在 JavaScript 中代表的是特殊非数字值,它本身是一个数字类型。
// not a number 的意思
console.log('typeof NaN:', typeof NaN)
// Infinity 不常用, 此处用来举例
console.log('typeof Infinity:', typeof Infinity)
console.log('\n')


// 返回 'boolean'
console.log('typeof true:', typeof true)
console.log('typeof false:', typeof false)
console.log('\n')


// 返回 'undefined'
console.log('typeof undefined:', typeof undefined)
// 不存在的变量也返回 undefined
console.log('typeof x:', typeof x)
console.log('\n')


// 返回 'bigint'
console.log('typeof 99n:', typeof 99n)
console.log('typeof BigInt(80):', typeof BigInt(80))
console.log('\n')


// 返回 'function'
console.log('typeof Array:', typeof Array)
console.log('typeof Object:', typeof Object)
console.log('typeof Date:', typeof Date)

console.log('typeof Number:', typeof Number)
console.log('typeof String:', typeof String)
console.log('typeof Boolean:', typeof Boolean)
console.log('\n')


// 返回 'object'
// 以上常用的区分不开的有 null {} [] 这三种
console.log('typeof {}:', typeof {})
console.log('typeof []:', typeof [])
console.log('typeof null:', typeof null)
console.log('\n')


// 返回 'symbol'
console.log('typeof Symbol("我是 symbol"):', typeof Symbol('我是 symbol'))