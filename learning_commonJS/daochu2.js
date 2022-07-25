/**
 * 当 module.exports = 引用类型时, 会看情况重组或覆盖
 */

// 重组
// module.exports = [-10] // dc2:  [ -10, hei: { id: 100 } ]
// module.exports.hei = { id: 100 }


// 覆盖
// module.exports.hei = { id: 100 } // dc2:  [ -10 ]
// module.exports = [-10]




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