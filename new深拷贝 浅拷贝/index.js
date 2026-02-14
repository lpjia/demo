/* 浅拷贝
复制对象或数组
复制原数据的第一层属性值
  若属性值是基本类型, 复制的是「值本身」，新旧数据互不影响
  若属性值是引用类型（对象、数组、函数等），复制的是「引用地址」，新旧数据共享同一个引用类型数据，修改其中一个会影响另一个
*/

/* Object.assign()
扩展运算符（...）
Array.prototype.slice()
*/

const objA = { name: 'aaa' }
const objB = { name: 'bbb' }
const objC = { name: 'ccc' }
const arrD = [objA, objB, objC]
// const arrE = Object.assign([], arrD)
const arrE = [...arrD]
// const arrE = arrD.slice()
// const arrE = Array.prototype.slice.call(arrD, 1)
objB.age = 18
console.log('arrD:', arrD)
console.log('arrE:', arrE)
console.log('objB:', objB)



/* 深拷贝
复制对象或数组
复制原数据所有层级的属性值, 新旧数据互不影响 */

/* JSON.parse(JSON.stringify())
递归实现
  cloneDeep
  R.clone
  _.cloneDeep
*/


// const { cloneDeep } = require('../util/commonMethod.js') // 引入报错
function cloneDeep(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'cloneDeep')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = cloneDeep(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
const objF = {
  objA,
  objB,
  objC,
  arrD,
}
// const objG = JSON.parse(JSON.stringify(objF))
const objG = cloneDeep(objF)
arrD.pop()
console.log('objF:', objF)
console.log('objG:', objG)