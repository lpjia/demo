/**
 * 当 module.exports = 引用类型时, 会看情况重组或覆盖
 */

// // 重组
// module.exports = [-10]
// module.exports.hei = { id: 100 }
// // [ -10, hei: { id: 100 } ]
// // 第二个合并到第一个里面成数组项了


// module.exports = { name: 'node文件' }
// module.exports.hei = { id: 120 }
// // { name: 'node文件', hei: { id: 120 } }


module.exports = { name: 'node文件' }
module.exports.hei = [0]
// { name: 'node文件', hei: [ 0 ] }


/**
 * 重组是先总(module.exports =)后分(module.exports.hei =)
 * 后面的分, 作为一个 key(或item)插入到总
 */