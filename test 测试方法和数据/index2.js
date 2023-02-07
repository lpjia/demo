import {
  reverseMapping, objToArr, deepClone,
} from '../util/commonMethod.js'
import { fireSensorStatus, device_type, device_type_reverse } from '../util/commonData.js'



// 知识点少, 先放这
// import 的取值
console.log('import.meta: ', import.meta)
console.log('就这一个属性 import.meta.url: ', import.meta.url)
console.log('---- 分割线 ----\n\n\n')



// 类似枚举
console.log('数据源: ', device_type)
console.log('反向映射后: ', device_type_reverse)
console.log('取值需要加数组索引: ', device_type_reverse['甲烷'][0])
console.log('---- 分割线 ----\n\n\n')



// 反向映射, 对于数组是把索引和值反向了
const arrayWithRepeatedValues = ['10', '11', '13', '11']
const reverseArrayItemsAndIndexes = reverseMapping(arrayWithRepeatedValues)
const reverseArrayItem = reverseArrayItemsAndIndexes['11']
console.log('reverseArrayItemsAndIndexes: ', reverseArrayItemsAndIndexes)
console.log('JSON.stringify(reverseArrayItemsAndIndexes): ', JSON.stringify(reverseArrayItemsAndIndexes))
console.log('reverseArrayItem: ', reverseArrayItem)
console.log('JSON.stringify(reverseArrayItem): ', JSON.stringify(reverseArrayItem))
console.log('---- 分割线 ----\n\n\n')



// 测试对象转数组方法的项顺序
console.log('fireSensorStatus: ', fireSensorStatus)
const allFireSensorStateArr = objToArr(fireSensorStatus, { v: 'value' })
console.log('数组项调位置前 allFireSensorStateArr: ', allFireSensorStateArr)
// 把最后面的"全部"项调到最前
const allFireSensorStateArr2 = deepClone(allFireSensorStateArr)
const popItem = allFireSensorStateArr2.pop()
allFireSensorStateArr2.unshift(popItem)
console.log('数组项调位置后 allFireSensorStateArr2: ', allFireSensorStateArr2)
console.log('深拷贝操作前的 allFireSensorStateArr: ', allFireSensorStateArr)
console.log('---- 分割线 ----\n\n\n')