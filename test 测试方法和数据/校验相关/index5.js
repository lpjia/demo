import {
  validFloat
} from '../../util/validateRules.js'


/* 数字类型 */
console.log("validFloat(123):",
  validFloat(123)
)
// js直接处理了实参, .123处理成0.123
console.log("validFloat(.123):",
  validFloat(.123)
)
console.log(".123:",
  .123
)
// js直接处理了实参, 123.处理成123
console.log("validFloat(123.):",
  validFloat(123.)
)
console.log("123.:",
  123.
)
// 正负数
console.log("validFloat(123.456):",
  validFloat(123.456)
)
console.log("validFloat(-123.456):",
  validFloat(-123.456)
)
console.log('---- 分割线 ----\n\n\n')


/* 字符串类型, 情况比较多 */
console.log("validFloat('-000234.567000'):",
  validFloat('-000234.567000') // 多余了很多0
)
console.log('---- 分割线 ----\n\n\n')


console.log("validFloat('123.'):",
  validFloat('123.')
)
console.log("validFloat('.123'):",
  validFloat('.123')
)
console.log("validFloat('aaa123'):",
  validFloat('aaa123')
)
console.log('---- 分割线 ----\n\n\n')