import {
  validNum
} from '../../util/validateRules.js'


console.log("validNum(123):",
  validNum(123)
)
// 这两种形式一般表单录入不来
console.log("validNum(123.):",
  validNum(123.)
)
console.log("validNum(123.00):",
  validNum(123.00)
)
// 浮点数不行
console.log("validNum(123.45):",
  validNum(123.45)
)
console.log("validNum(.123):",
  validNum(.123)
)
// 负数不行
console.log("validNum(-123):",
  validNum(-123)
)
// 字符串带0可以, 但是不能带小数点和-号
console.log("validNum('0012'):",
  validNum('0012')
)
console.log("validNum('-12'):",
  validNum('-12')
)
console.log("validNum('12.'):",
  validNum('12.')
)