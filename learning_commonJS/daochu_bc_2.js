/**
 * 当 module.exports = 引用类型时, 会看情况重组或覆盖
 */

// // 覆盖
// module.exports.hei = { id: 100 }
// module.exports = [-10]
// // [ -10 ]


module.exports.hei = { id: 120 }
module.exports = { sex: 'famale' }
// { sex: 'famale' }


/**
 * 覆盖是先分(module.exports.hei =)后总(module.exports =)
 * 后面的总, 直接覆盖前面所有分
 */