import { generateIntArr, getRandomIntInclusive } from '../util/commonMethod.js'


// console.log('import.meta.url: ', import.meta.url)
// console.log('import.meta: ', import.meta)



// 随机长度数组, 数组项可重复
let arr3 = generateIntArr(getRandomIntInclusive(1, 10), { min: 1, max: 10, isUnique: true })
// console.log(arr3)

let arr4 = generateIntArr(5, { min: 1, max: 10, isUnique: true })
// console.log(arr4)




// 比较目标数组里是否包含另一个数组里的所有元素, 元素都是基本数据类型
function isContainAllArrItem(goalArr, arr) {
  let set = new Set(arr)
    , isContain = goalArr.every(val => {
      // console.log('val: ', val)
      // console.log('set.has(val): ', set.has(val))
      return set.has(val)
    })
  return isContain
}
let arr5 = [1, 4, 3, 2, 5]
let goalArr = [2, 1, 5]
let boo = isContainAllArrItem(goalArr, arr5)
// console.log('boo: ', boo)

let goalArr2 = [2, 13, 5]
let boo2 = isContainAllArrItem(goalArr2, arr5)
// console.log('boo2: ', boo2)