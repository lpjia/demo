import {
  objToArr, arrToObj
} from '../util/commonMethod.js'


// 对象转对象数组
// 因为 k 一般是字符串, 所以转换后有可能需要 number 类型的数据, 所以增加一个配置项 isNum
const objName = {
  110: '报警电话',
  114: '查号电话',
  119: '火警电话',
  120: '急救电话',
}
console.log('使用默认参: ', objToArr(objName))
console.log('使用默认参 转number类型: ', objToArr(objName, { isNum: true }))
let customArr = objToArr(objName, {
  l: 'label',
  v: 'value',
})
console.log('使用自定义参: ', customArr)
console.log('---- 分割线 ----\n\n\n')


// 对象数组转对象
// 借用上面的对象数组数据
let customObj = arrToObj(customArr, {
  k: 'value',
  v: 'label',
})
console.log('使用自定义参: ', customObj)
console.log('---- 分割线 ----\n\n\n')