import {
  validIncludesChinese
} from '../../util/validateRules.js'


console.log("validIncludesChinese('askg开心hksah'):",
  validIncludesChinese('askg开心hksah')
)
console.log('---- 分割线 ----\n\n\n')


console.log("validIncludesChinese(''):",
  validIncludesChinese('')
)
console.log("validIncludesChinese('askghksah'):",
  validIncludesChinese('askghksah')
)