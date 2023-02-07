import {
  factorial, arrangement, combination,
} from '../util/commonMethod.js'

// 纯粹是因为兴趣

// 阶乘
const jiecheng = factorial(5)
console.log('jiecheng: ', jiecheng)
// 排列
const pailie = arrangement(5, 0)
console.log('pailie: ', pailie)
const pailie2 = arrangement(5, 2)
console.log('pailie2: ', pailie2)
const pailie3 = arrangement(5, 3)
console.log('pailie3: ', pailie3)
// 组合
const zuhe = combination(5, 0)
console.log('zuhe: ', zuhe)
const zuhe2 = combination(5, 2)
console.log('zuhe2: ', zuhe2)
const zuhe3 = combination(5, 3)
console.log('zuhe3: ', zuhe3)
console.log('---- 分割线 ----\n\n\n')