const dc = require('./daochu')
const daochu_default = require('./daochu_default')
const dc_bc = require('./daochu_bc')
const dc_bc_2 = require('./daochu_bc_2')
const dc2 = require('./daochu2')
const { big: bInt, big } = require('./daochu')

const dc3_bc = require('./daochu3_bc')



console.log('dc: ', dc)
console.log('---- 分割线 ----\n')

console.log('daochu_default: ', daochu_default)
console.log('---- 分割线 ----\n')

console.log('dc_bc: ', dc_bc)
console.log('---- 分割线 ----\n')

console.log('dc_bc_2: ', dc_bc_2)
console.log('---- 分割线 ----\n')

console.log('dc2: ', dc2)
console.log('---- 分割线 ----\n')

console.log('big: ', big)
console.log('bInt: ', bInt)
console.log('---- 分割线 ----\n')


require('./daochu3')()
console.log('---- 分割线 ----\n')

console.log('dc3_bc:', dc3_bc)
console.log('dc3_bc.changjian():', dc3_bc.changjian())
console.log('dc3_bc.changjian_2():', dc3_bc.changjian_2())
console.log('dc3_bc.changjian_3():', dc3_bc.changjian_3())
console.log('---- 分割线 ----\n')