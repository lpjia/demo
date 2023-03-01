
// 覆盖负数、前置0、后置0、小数点
console.log("Number('-000123.45600'):",
  Number('-000123.45600')
)
console.log("Number('000123.45600'):",
  Number('000123.45600')
)
console.log("Number('-.123'):",
  Number('-.123')
)
console.log("Number('-456.'):",
  Number('-456.')
)
console.log('---- 分割线 ----\n\n\n')


// 非数字的字符, Number()转后一般都是 NaN
// Number('null')
console.log("Number('null'):",
  Number('null') // NaN
)
console.log("Number('abc123'):",
  Number('abc123') // NaN
)

// 其他数据类型转number
console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log("Number(undefined):",
  Number(undefined) // NaN
)
console.log("Number(null):",
  Number(null) // 0
)
console.log("Number(''):",
  Number('') // 0
)


console.log("Number({}):",
  Number({}) // NaN
)
console.log("Number([]):",
  Number([]) // 0
)
console.log("Number(NaN):",
  Number(NaN) // NaN
)
console.log('---- 分割线 ----\n\n\n')


/* 一般表单输入的数据都是string, 要想判断数字相关的
先校验非空字符串, 去掉 ''
由于 [] '' null true false 用Number()都能转成正确的number, 所以先用typeof x判断, number和string留下
再用Number()转, 结果用Number.isNaN()去判断, 留下非NaN的数据
再去调自己封装的校验方法 */



console.log("Number.isNaN(NaN):",
  Number.isNaN(NaN)
)
console.log("NaN === NaN:",
  NaN === NaN
)
console.log("NaN == NaN:",
  NaN == NaN
)