import {
  validDomainUrl
} from '../../util/validateRules.js'


// 一般是取 location.origin
console.log("validDomainUrl('http://'):",
  validDomainUrl('http://')
)
console.log("validDomainUrl('https://'):",
  validDomainUrl('https://')
)
console.log('---- 分割线 ----\n\n\n')


// 取值可能是无效值
console.log("validDomainUrl(undefined):",
  validDomainUrl(undefined)
)
console.log("validDomainUrl(null):",
  validDomainUrl(null)
)
console.log("validDomainUrl(''):",
  validDomainUrl('')
)