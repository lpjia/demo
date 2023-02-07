import {
  judgeNotEmpty
} from '../util/commonMethod.js'



// 一次测试所有空
console.log('judgeNotEmpty(null): ', judgeNotEmpty(null))
console.log('judgeNotEmpty(undefined): ', judgeNotEmpty(undefined))
console.log('judgeNotEmpty(false): ', judgeNotEmpty(false))
console.log("judgeNotEmpty(''): ", judgeNotEmpty(''))
console.log('judgeNotEmpty(0): ', judgeNotEmpty(0))
console.log('judgeNotEmpty(NaN): ', judgeNotEmpty(NaN))
// 空对象和空数组也被当做成空
console.log('judgeNotEmpty({}): ', judgeNotEmpty({}))
console.log('judgeNotEmpty([]): ', judgeNotEmpty([]))
console.log('---- 分割线 ----\n\n\n')



// 测试不为空的
console.log('judgeNotEmpty(true): ', judgeNotEmpty(true))
console.log("judgeNotEmpty('0'): ", judgeNotEmpty('0'))
console.log('judgeNotEmpty(1): ', judgeNotEmpty(1))
console.log("judgeNotEmpty({ hello: 'world' }): ", judgeNotEmpty({ hello: 'world' }))
console.log('judgeNotEmpty([1, 2, 3]): ', judgeNotEmpty([1, 2, 3]))
console.log('---- 分割线 ----\n\n\n')