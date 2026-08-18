/* 判断值是NaN, 只能用Number.isNaN(), 别考虑其它
不要用isNaN(), 会有隐式转换 */
// console.log(isNaN(NaN)) // true
// console.log(Number.isNaN(NaN)) // true


// console.log(NaN === NaN) // false
// console.log(NaN == NaN) // false


/* 其它数据类型转number类型 */

// console.log(Number(true)); // 1
// console.log(Number(false)); // 0


// console.log(Number(undefined)) // NaN
// console.log(Number(null)) // 0
// console.log(Number(NaN)) // NaN


console.log(Number([])) // 0
console.log(Number({})) // NaN


console.log(Number('')) // 0

/* 可以看出, js引擎尽量把'全是数字相关'的字符串往正规数转
覆盖负数、前置0、后置0、小数点 */
console.log(Number('-000123.45600')) // -123.456
console.log(Number('000123.45600')) // 123.456
console.log(Number('-.123')) // -0.123
console.log(Number('-456.')) // -456

/* 非'全是数字'的字符, Number()转后一般都是 NaN */
console.log(Number('null')) // NaN
console.log(Number('abc123')) // NaN



/* 一般表单项的数据都是string, 要想判断数字相关的
先校验非空字符串, 去掉 ''
由于  []  ''  null  true  false  用Number()都能转成正确的number, 所以先用typeof x判断, number和string留下
再用Number()转, 其结果用Number.isNaN()去判断, 留下非NaN的数据
再去调自己封装的校验方法 */