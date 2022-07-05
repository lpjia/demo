import { deepClone } from '../util/commonMethod.js'

// 不用打印, 把代码直接粘贴到控制台中运行
// 简洁高效



/**
 * arr.map()
 */
let idxArr = [
  { idx: 1 },
  { idx: 2 },
  { idx: 3 },
]
// map 会返回处理后的数组
idxArr.map(item => {
  return { idx: item.idx + 10 }
})

// arr.forEach()
// 无返回值, 但是有时会改变引用类型的数据
idxArr.forEach(item => item.id = 100)
// 每个对象都多了个 id: 100 的属性
idxArr
// 真想改变原数组, 定义一个临时数组, 可以遍历原数组
// 组装新数据 push 到临时数组存起来, 把临时数组赋值给原数组即可

let arr5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr5.map(String);
// 返回 ['1', '2', '3', '4', '5', '6', '7', '8', '9']

let arr7 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr7.map(Math.pow);
// 返回 [1, 2, 9, 64, 625, 7776, 117649, 2097152, 43046721]
/**
 * 为啥没有返回预期的 [1, 4, 9, ...]
 * 因为 map 方法接收的第一个参是函数, 该函数内的参顺序是 item, idx, arrayItself
 * Math.pow 方法接收的参顺序是 底数, 指数
 * 所以计算结果是按 item 的 idx 次幂算的
 */






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
 * arr.every()
 */
// 未完待续





/**
 * arr.sort()
 */
// 未完待续




/**
 * arr.at()
 */
// idxArr
let arr = ['red', 'green', 'blue']
arr.at()







/**
 * arr.includes()
 */
let arr = [null, undefined, '', 0, NaN, false, {}, []]

// console.log('arr.includes(null):', arr.includes(null))
// console.log('arr.includes(undefined):', arr.includes(undefined))
// console.log('arr.includes(""):', arr.includes(''))
// console.log('arr.includes(0):', arr.includes(0))
// console.log('arr.includes(NaN):', arr.includes(NaN))
// console.log('arr.includes(false):', arr.includes(false))
// console.log('arr.includes({}):', arr.includes({}))
// console.log('arr.includes([]):', arr.includes([]))




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