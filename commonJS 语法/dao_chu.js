/* 导出
exports.xxx = 
module.exports.xxx =
两者混合着用, 都能正常导出数据 */


// console.log('this:', this)


// 在前面位置可以导出
module.exports.hei = { id: 100 }


exports.num = 110
exports.big = 119n
exports.str = 'this is caochu.js'
exports.boo = true
exports.nul = null
exports.und = undefined
exports.sym = Symbol('this is sym')
exports.obj = {
  id: 1
}
exports.arr = [10]


// 在后面位置可以导出
module.exports.ha = { id: 10 }


// /* module.exports =
// 权重最高 */
// module.exports = {}


// console.log('this:', this)