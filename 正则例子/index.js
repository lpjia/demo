import {
  validFloat, removeAllSpace, validIntString
} from './fn.js'


// console.log("validFloat('阿萨德'): ", validFloat('阿萨德')) // 报错
console.log('validFloat("123"): ', validFloat("123"))
console.log('validFloat("+123"): ', validFloat("+123"))
console.log('validFloat("-123"): ', validFloat("-123"))
console.log('validFloat("123."): ', validFloat("123."))
console.log('validFloat("+123."): ', validFloat("+123."))
console.log('validFloat("-123."): ', validFloat("-123."))
console.log('validFloat(".123"): ', validFloat(".123"))
console.log('validFloat("123.00"): ', validFloat("123.00"))
console.log('validFloat("123.456"): ', validFloat("123.456"))
console.log('---- 分割线 ----\n\n\n')


console.log('validFloat(123.): ', validFloat(123.))
console.log('validFloat(+123.): ', validFloat(+123.))
console.log('validFloat(-123.): ', validFloat(-123.))
console.log('validFloat(.123): ', validFloat(.123))
console.log('validFloat(+.123): ', validFloat(+.123))
console.log('validFloat(-.123): ', validFloat(-.123))
console.log('validFloat(123): ', validFloat(123))
console.log('validFloat(+123): ', validFloat(+123))
console.log('validFloat(-123): ', validFloat(-123))
console.log('validFloat(123.00): ', validFloat(123.00))
console.log('validFloat(+123.00): ', validFloat(+123.00))
console.log('validFloat(-123.00): ', validFloat(-123.00))
console.log('validFloat(123.456): ', validFloat(123.456))
console.log('validFloat(+123.456): ', validFloat(+123.456))
console.log('validFloat(-123.456): ', validFloat(-123.456))
console.log('---- 分割线 ----\n\n\n')




// console.log(removeAllSpace()) // 报错
// console.log(removeAllSpace(123)) // 报错
console.log("removeAllSpace('kjhfdg asdjfh'): ", removeAllSpace('kjhfdg asdjfh'))
console.log("removeAllSpace(  fdg asd  '): ", removeAllSpace('  fdg asd  '))
console.log('---- 分割线 ----\n\n\n')





// console.log(validIntString(123)) // 报错
console.log("validIntString('abc123'):", validIntString('abc123'))
console.log("validIntString('abc123.+/'):", validIntString('abc123.+/'))
console.log("validIntString('123456789', 3):", validIntString('123456789', 3))
console.log("validIntString('2', 5):", validIntString('2', 5))
// 符合的
console.log("validIntString('123'):", validIntString('123'))
console.log("validIntString('00123', 5):", validIntString('00123', 5))
console.log("validIntString('000123000'):", validIntString('000123000'))
console.log('---- 分割线 ----\n\n\n')