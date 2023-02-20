import {
  validEmail
} from '../util/validateRules.js'


/* 任意多个字符+@+任意多个字符+.+任意多个字符 */
const strEmail = '420@qq.com'
const bolResult = validEmail(strEmail)
console.log('bolResult:', bolResult)
console.log('---- 分割线 ----\n\n\n')


// 只能有一个@和.是吧
console.log("validEmail('420@420@qq.com'):",
  validEmail('420@420@qq.com')
)
console.log("validEmail('420@qq.com.com'):",
  validEmail('420@qq.com.com')
)
// 头尾不能是@和.是吧
console.log("validEmail('@420@qq.com'):",
  validEmail('@420@qq.com')
)
console.log("validEmail('420@qq.com.'):",
  validEmail('420@qq.com.')
)
console.log('---- 分割线 ----\n\n\n')


/* 
方便clgd的copy
validEmail('@420@qq.com')
*/