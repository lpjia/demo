/* require() 可以省略.js后缀, 默认加载的都是js文件
在nodejs中一切文件皆模块 */


const daoChu = require('./dao_chu')
const daoChuDefault = require('./dao_chu_default')
const daoChu2 = require('./dao_chu2')
const daoChu3 = require('./dao_chu3')
const { big: bInt, big } = require('./dao_chu')
const daoChu4 = require('./dao_chu4')
const daoChu5 = require('./dao_chu5')


// console.log('daoChu:', daoChu)
// console.log('daoChuDefault:', daoChuDefault)
// console.log('daoChu2:', daoChu2)
// console.log('daoChu3:', daoChu3)

// console.log('big: ', big)
// console.log('bInt: ', bInt)

// console.log('daoChu4:', daoChu4)
// console.log('daoChu4 调用:', daoChu4())
// require('./dao_chu4')() // 直接导入调用

// console.log('daoChu5:', daoChu5)
// console.log(daoChu5.fn_arrow())
// console.log(daoChu5.fn())
// console.log(daoChu5.fn_function())