import chineseUppercase from '../util/exchangeChineseUppercase.js'

console.log('chineseUppercase(-15.452): ', chineseUppercase(-15.452))
console.log('chineseUppercase(234.458): ', chineseUppercase(234.458)) // 直接舍去, 不四舍五入

console.log('chineseUppercase(123456789): ', chineseUppercase(123456789)) // 亿级别
console.log('chineseUppercase(1234567891): ', chineseUppercase(1234567891)) // 十亿级别
console.log('chineseUppercase(12345678912): ', chineseUppercase(12345678912)) // 百亿级别
console.log('chineseUppercase(123456789123): ', chineseUppercase(123456789123)) // 千亿级别
console.log('千亿级别: ', 123456789123..toLocaleString())

// 万亿级别, 错的
// console.log('chineseUppercase(1234567891234): 错的! ', chineseUppercase(1234567891234)) // 万亿级别
console.log('Number.MAX_SAFE_INTEGER: ', Number.MAX_SAFE_INTEGER)
console.log('Number.MAX_SAFE_INTEGER.toLocaleString(): ', Number.MAX_SAFE_INTEGER.toLocaleString())
console.log((Number.MAX_SAFE_INTEGER + '').length)
// console.log('chineseUppercase(Number.MAX_SAFE_INTEGER): 错的! ', chineseUppercase(Number.MAX_SAFE_INTEGER)) // 这明显不对


// 带小数的
// console.log(chineseUppercase(123456789.11))
// console.log(chineseUppercase(-123456789.11))
// console.log(chineseUppercase(1234567891.11))
// console.log(chineseUppercase(12345678912.11))
console.log(chineseUppercase(123456789123.11)) // 千亿级别
console.log(chineseUppercase(-999999999999.11)) // 千亿级别

// 万亿级别, 错的
// console.log(chineseUppercase(1234567891234.11))