import {
  validMobilePhone
} from '../../util/validateRules.js'


/* 11位手机号 */
console.log("validMobilePhone(15712341234):",
  validMobilePhone(15712341234)
)
console.log("validMobilePhone('15712341234'):",
  validMobilePhone('15712341234')
)
console.log('---- 分割线 ----\n\n\n')


// 位数不够
console.log("validMobilePhone(1571234):",
  validMobilePhone(1571234)
)
// 有小数点等符号
console.log("validMobilePhone('1571234123.'):",
  validMobilePhone('1571234123.')
)
console.log("validMobilePhone('157.1234123'):",
  validMobilePhone('157.1234123')
)
console.log("validMobilePhone('a1571234123'):",
  validMobilePhone('a1571234123')
)