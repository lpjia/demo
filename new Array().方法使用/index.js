import { deepClone } from '../util/commonMethod.js'

// 不用打印, 把代码直接粘贴到控制台中运行
// 简洁高效









/**
 * arr.flatMap()
 */
let arr9 = [
  { name: 'one', val: 1 },
  { name: 'five', val: 5 },
  { name: 'three', val: 3 },
  { name: 'two', val: 2 },
  { name: 'four', val: 4 },
]
// 参数和 map 方法使用一致
arr9.flatMap(item => {
  return item.val > 3 ? [item] : []
})
// 返回 [ { name: 'five', val: 5 }, { name: 'four', val: 4 }, ]
// 实际上这个例子算是 map + filter + flat 的结合



/**
 * arr.filter()
 */
let arr2 = [0, 1, false, null, '1', 2, undefined, 3, 5, NaN, '', 8]
let arr6 = arr2.filter(Boolean)
console.log('arr6: ', arr6)

// filter 和 map 链式操作
let arr4 = [1, 2, 3, 4];
let Larry = [];
let filterArr = arr4.filter((item) => {
  return item > 2;
})
let my = arr4.filter(item => {
  return item > 2;
}).map(value => {
  Larry.push(value * 2)
  // return value * 10
})
console.log(arr4);  		//Array(4) [1, 2, 3, 4]
console.log(filterArr) // [3, 4]
console.log(my);   		//Array(2) [undefined, undefined]
console.log(Larry);		//Array(2) [6, 8]


// filter 单独链式操作
let url = "list.json"
let response = await fetch(url);

if (!response.ok) throw new Error('response failed')
let res = await response.json();
console.log('res: ', res)
let resArr = res.sectionDataList.filter(item => {
  return item.sectionID === 71831
})[0].
  sensorDataList.filter(item => {
    const condition = [2, 5, 14]
    return condition.includes(item.sensorType)
  })
console.log('resArr: ', resArr)

let resArr2 = deepClone(resArr)
  , idx = resArr2.findIndex(curr => curr.sensorType === 2)
console.log('被删掉的项: ', resArr2.splice(idx, 1))
console.log('操作后的数组: ', resArr2)




/**
 * arr.reduce()
 * [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
 */
let arr8 = [
  { id: 'one', name: 'yi' },
  { id: 'two', name: 'er' },
  { id: 'three', name: 'san' },
]
arr8.reduce((total, curr) => {
  total[curr.id] = curr.name
  return total
}, {})
// 返回 {one: 'yi', two: 'er', three: 'san'}
// 把对象数组变为对象








/**
 * arr.sort()
 */
// 未完待续




/**
 * arr.at()
 */
// idxArr
let arr10 = ['red', 'green', 'blue']
// arr10.at()






/**
 * arr.find()
 */
const arr3 = [
  { val: 1, id: '1', },
  { val: 2, id: '2', },
  { val: 3, id: '3', },
  { val: 3, id: '4', },
  { val: 5, id: '5', },
];
// 找到符合条件的就会终止遍历, 只找第一个匹配的, 性能比 filter 好点
const result = arr3.find(item => item.val === 3)
// console.log('result: ', result)