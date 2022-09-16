import {
  reverseMapping, objToArr, deepClone,
  factorial, arrangement, combination,
  generateIntArr, getRandomIntInclusive, arrToObj,
  isExternal, removeObjEmptyKey, objKeyToOrmField
} from '../util/commonMethod.js'
import { getImgGroupByDevice, fireSensorStatus } from '../util/commonData.js'
import diff from '../util/diff.js'




// 可以用 number 类型
const sensorType = getImgGroupByDevice(1)
console.log('sensorType: ', sensorType)
console.log('typeof sensorType: ', typeof sensorType)
console.log('---- 分割线 ----\n\n\n')

const sensorType2 = getImgGroupByDevice(0)
console.log('没有该类型时, 返回空字符串 sensorType2: ', sensorType2)
console.log('typeof sensorType2: ', typeof sensorType2)
console.log('---- 分割线 ----\n\n\n')


// diff 算法
const curr = {
  a: 1,
  b: 2,
  c: "str",
  d: {
    e: [2, { a: 4 }, 5]
  },
  f: true,
  h: [1],
  g: {
    a: [1, 2],
    j: 111
  }
};
const prev = {
  a: [],
  b: "aa",
  c: 3,
  d: {
    e: [3, { a: 3 }]
  },
  f: false,
  h: [1, 2],
  g: {
    a: [1, 1, 1],
    i: "delete"
  },
  k: 'del'
};

const difference = diff(curr, prev)
console.log('difference: ', difference)
console.log('difference.toString(): ', difference.toString())
console.log('JSON.stringify(difference): ', JSON.stringify(difference))
const stringifyDiff = JSON.stringify(difference)
// 不传参其实传了个 undefined, json 序列化直接跳过
console.log('JSON.stringify(): ', JSON.stringify())
// null 可以被 json 序列化
console.log('JSON.stringify(null): ', JSON.stringify(null))
console.log('JSON.parse(stringifyDiff): ', JSON.parse(stringifyDiff))
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
// const allFireSensorStateObj = 
console.log('fireSensorStatus: ', fireSensorStatus)
const allFireSensorStateArr = objToArr(fireSensorStatus, { v: 'value' })
console.log('数组项调位置前 allFireSensorStateArr: ', allFireSensorStateArr)
// 把最后面的"全部"项调到最前
const allFireSensorStateArr2 = deepClone(allFireSensorStateArr)
const popItem = allFireSensorStateArr2.pop()
allFireSensorStateArr2.unshift(popItem)
console.log('数组项调位置后 allFireSensorStateArr2: ', allFireSensorStateArr2)
console.log('---- 分割线 ----\n\n\n')





// 阶乘
const jiecheng = factorial(5)
console.log('jiecheng: ', jiecheng)
// 排列
const pailie = arrangement(5, 0)
console.log('pailie: ', pailie)
const pailie2 = arrangement(5, 2)
console.log('pailie2: ', pailie2)
const pailie3 = arrangement(5, 3)
console.log('pailie3: ', pailie3)
// 组合
const zuhe = combination(5, 0)
console.log('zuhe: ', zuhe)
const zuhe2 = combination(5, 2)
console.log('zuhe2: ', zuhe2)
const zuhe3 = combination(5, 3)
console.log('zuhe3: ', zuhe3)
console.log('---- 分割线 ----\n\n\n')



// import 的取值
console.log('import.meta.url: ', import.meta.url)
console.log('import.meta: ', import.meta)
console.log('---- 分割线 ----\n\n\n')




// 随机长度数组, 数组项可重复
const arrayOfAnyLengthWithRepeatedValues = generateIntArr(getRandomIntInclusive(1, 10), { min: 1, max: 10 })
console.log('arrayOfAnyLengthWithRepeatedValues: ', arrayOfAnyLengthWithRepeatedValues)
const arrayOfAnyLengthWithoutRepeatedValues = generateIntArr(getRandomIntInclusive(1, 10), { min: 1, max: 10, isUnique: true })
console.log('arrayOfAnyLengthWithoutRepeatedValues: ', arrayOfAnyLengthWithoutRepeatedValues)
const arrayOfWithRepeatedValues = generateIntArr(5, { min: 1, max: 10 })
console.log('arrayOfWithRepeatedValues: ', arrayOfWithRepeatedValues)
const arrayOfWithoutRepeatedValues = generateIntArr(5, { min: 1, max: 10, isUnique: true })
console.log('arrayOfWithoutRepeatedValues: ', arrayOfWithoutRepeatedValues)
console.log('---- 分割线 ----\n\n\n')



// 可选链操作符
const user = {}
console.log('user?.address?.street: ', user?.address?.street)
console.log('---- 分割线 ----\n\n\n')




// 替代多个或 || 的写法
const type = 2
if (type === 1 || type === 2 || type === 3) {
  console.log('type === 1 || type === 2 || type === 3 的写法')
}
switch (type) {
  case 1: case 2: case 3:
    console.log('switch case 写法')
    break;
  default:
    break;
}
const condition = [1, 2, 3]
if (condition.includes(type)) {
  console.log('arr.includes 写法, 推荐')
}
console.log('---- 分割线 ----\n\n\n')




// 组织架构, 扁平化且去重
const deps = {
  '人事部': [5, 8, 12],
  '行政部': [5, 14, 79],
  '运输部': [3, 64, 105],
  '采购部': [1, 2, 3],
}
const member = [...new Set(Object.values(deps).flat(Infinity))]
console.log('member: ', member)
console.log('升序后: ', member.sort((a, b) => a - b))
console.log('---- 分割线 ----\n\n\n')




const path_2 = 'https:'
const testIsExternal_2 = isExternal(path_2)
console.log('testIsExternal_2:', testIsExternal_2)
const path_3 = 'http:'
const testIsExternal_3 = isExternal(path_3)
console.log('testIsExternal_3:', testIsExternal_3)
const path_4 = 'files:'
const testIsExternal_4 = isExternal(path_4)
console.log('testIsExternal_4:', testIsExternal_4)
console.log('---- 分割线 ----\n\n\n')






// 测试数组结构转变的那两个方法
// 接口返回的数据结构有 renmingArr 对象数组, name 表示显示的文本(对应 label), value 表示需要传的值, 可以直接拿到 el-select 用
// 接口返回的是枚举类型, 类似 obj, 需要通过
const renmingArr = [
  { name: 'xm', value: 'k' },
  { name: 'xz', value: 'k2' },
  { name: 'xc', value: 'k3' },
]
const renmingObj = arrToObj(renmingArr)
console.log('renmingObj: ', renmingObj)
const renmingArr2 = [
  { name: 'xm', id: 'k' },
  { name: 'xz', id: 'k2' },
  { name: 'xc', id: 'k3' },
]
const renmingObj2 = arrToObj(renmingArr2, { k: 'id' })
console.log('renmingObj2: ', renmingObj2)
const renmingArr3 = objToArr(renmingObj)
console.log('renmingArr3: ', renmingArr3)
const renmingArr4 = objToArr(renmingObj, { l: 'label', v: 'type' })
console.log('renmingArr4: ', renmingArr4)
console.log('---- 分割线 ----\n\n\n')





// 过滤掉为空的 key, 不过滤 0 false
const includeNullFieldsObj = {
  emptyObj: {},
  emptyArr: [],
  emptyUndefined: undefined,
  emptyNull: null,
  emptyNum: NaN,
  emptyString: '',
  isFalse: false,
  num: 0,
}
const excludeNullFieldsObj = removeObjEmptyKey(includeNullFieldsObj)
console.log('excludeNullFieldsObj:', excludeNullFieldsObj)
const excludeNullFieldsObj_2 = removeObjEmptyKey(deepClone(includeNullFieldsObj), ['array', 'object'])
console.log('excludeNullFieldsObj_2:', excludeNullFieldsObj_2)
console.log('---- 分割线 ----\n\n\n')





// 把普通对象转换成orm需要的数据结构
console.log(objKeyToOrmField(excludeNullFieldsObj_2))
console.log('---- 分割线 ----\n\n\n')