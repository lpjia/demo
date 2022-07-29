module.exports = 111
// 当有 module.exports = 基本数据类型时, 下面这些导出写法会被覆盖
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