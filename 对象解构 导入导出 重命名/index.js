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
console.log('---- 分割线 ----\n\n\n')


console.log('moren: ', moren)
console.log('---- 分割线 ----\n\n\n')


console.log('mingmingAs: ', mingmingAs)
console.log('mingmingAs.dc: ', mingmingAs.dc)
console.log('---- 分割线 ----\n\n\n')


console.log('hunhe: ', hunhe)
console.log('mm: ', mm)
console.log('---- 分割线 ----\n\n\n')


console.log('morenAs: ', morenAs)
console.log('morenAs.default: ', morenAs.default)
console.log('---- 分割线 ----\n\n\n')





/**
 * 对象解构
 * 用冒号 :
 */
const obj = {
  name: 'obj',
  money: 100 ** 3,
  hasMoney: true,
}
const { name, money, hasMoney: isRich, noZiduan = '默认赋值' } = obj
console.log('name: ', name)
console.log('money: ', money)
console.log('isRich: ', isRich)
console.log('noZiduan: ', noZiduan)
console.log('---- 分割线 ----\n\n\n')


/**
 * 多层解构
 */
const obj2 = {
  name: 'this is obj2',
  child: {
    childName: 'this is childName',
    childAge: 1
  }
}
const {
  name: objName,
  child: { childName, childAge },
  child // 为了不报错, 不写这行取不到 child
} = obj2
console.log('objName: ', objName)
console.log('child: ', child)
console.log('childName: ', childName)
console.log('childAge: ', childAge)
console.log('---- 分割线 ----\n\n\n')


/**
 * 变量值互换, 数组解构
 */
// let a = 100, b = 80
let a = 100
let b = 80
console.log('a: ', a)
console.log('b: ', b)
console.log('解构后互换值'); // 这里要必须加;
[a, b] = [b, a]
console.log('a: ', a)
console.log('b: ', b)
console.log('---- 分割线 ----\n\n\n')