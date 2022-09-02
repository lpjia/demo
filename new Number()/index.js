/**
 * 常见的数字形式
 */
console.log('Number(".123"): ', Number(".123")) // 0.123
console.log('Number("-.123"): ', Number("-.123")) // -0.123
console.log('Number("123."): ', Number("123.")) // 123
console.log('Number("456.00"): ', Number("456.00")) // 456


/**
 * 遇见表单等只能输入数字+小数点的时候, 由于表单输入为 string 类型, 可以先转为 number 类型,
 * 只能用 Number.isNaN() 去判断, 不为 NaN 时再去校验
 */
console.log('Number.isNaN(NaN): ', Number.isNaN(NaN))
console.log('NaN === NaN: ', NaN === NaN)
console.log('NaN == NaN: ', NaN == NaN)
console.log('---- 分割线 ----\n\n\n')


console.log(Number(NaN)); // NaN


// 各种数据类型转数字
console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0

console.log(Number({})); // NaN
console.log(Number([])); // 0