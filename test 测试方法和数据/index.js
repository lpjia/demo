import {
  generateIntArr, getRandomIntInclusive, isExternal,
  reverseMapping
} from '../util/commonMethod.js'
import {
  getImgGroupByDevice, device_type_reverse, device_unit
} from '../util/commonData.js'
import diff from '../util/diff.js'



// 多对一映射
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



// 测试是否为外链
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