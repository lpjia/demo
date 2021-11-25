/**
 * 命名导入 重命名
 * {} 里面用 as
 */
import { dc as showTxt } from './export.js'


/**
 * 常用写法
 */
import moren from './defaultExport.js'


/**
 * 用的混合导出
 */

import hunhe, { mm } from './hybridExport.js'


/**
 * 另一种写法
 * 多个同时导出
 * as 后面的变量, 则作为原生 module 对象
 */
import * as mingmingAs from './export.js'

import * as morenAs from './defaultExport.js'


console.log('showTxt: ', showTxt)


console.log('moren: ', moren)


console.log('mingmingAs: ', mingmingAs)
console.log('mingmingAs.dc: ', mingmingAs.dc)


console.log('hunhe: ', hunhe)
console.log('mm: ', mm)


console.log('morenAs: ', morenAs)
console.log('morenAs.default: ', morenAs.default)





/**
 * 对象解构
 * 用冒号 :
 */
const obj = {
  name: 'obj',
  money: 100 ** 3,
  hasMoney: true,
}
const { name, money, hasMoney: isRich } = obj
console.log('name: ', name)
console.log('money: ', money)
console.log('isRich: ', isRich)