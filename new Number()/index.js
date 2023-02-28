
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



// 



/**
 * 遇见表单等只能输入数字+小数点的时候, 由于表单输入为 string 类型, 可以先转为 number 类型,
 * 只能用 Number.isNaN() 去判断, 不为 NaN 时再去校验
 */

// 非数字的字符, Number()转后一般都是 NaN
console.log("Number.isNaN(NaN):",
  Number.isNaN(NaN)
)
console.log("NaN === NaN:",
  NaN === NaN
)
console.log("NaN == NaN:",
  NaN == NaN
)