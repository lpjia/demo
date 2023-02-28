import {
  validPassword
} from '../../util/validateRules.js'

/* 校验密码一般需要提高安全等级 */

console.log("validPassword('_abcXYZ890'):",
  validPassword('_abcXYZ890')
)
console.log("validPassword('xyz666_MMM'):",
  validPassword('xyz666_MMM')
)
console.log('---- 分割线 ----\n\n\n')



// 位数不够
console.log("validPassword('x6_M'):",
  validPassword('x6_M')
)
// 有空格能通过校验, 所以得提前移除所有空格
console.log("validPassword('x6_M N'):",
  validPassword('x6_M N')
)
const str = 'x6_M N'
const strReplace = str.replace(' ', '') // 移除所有空格
console.log(str, strReplace, validPassword(strReplace))


// 缺少大写字母
console.log("validPassword('_xj123'):",
  validPassword('_xj123')
)
// 缺少小写
console.log("validPassword('_OPPO123'):",
  validPassword('_OPPO123')
)
// 缺少数字
console.log("validPassword('Magic_'):",
  validPassword('Magic_')
)
// 缺少特殊字符
console.log("validPassword('Magic2'):",
  validPassword('Magic2')
)