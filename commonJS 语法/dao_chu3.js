/* module.exports =
权重最高 */
module.exports = {}


/* 当 module.exports = 引用数据类型
后面再有exports.xxx =, exports.xxx =无效, 不能导出 */
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


/* 当 module.exports = 引用数据类型
后面再有module.exports.xxx =, module.exports.xxx =无效, 不能导出 */
module.exports.a = {}


// console.log('this:', this)