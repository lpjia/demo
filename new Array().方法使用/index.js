// 不用打印, 把代码直接粘贴到控制台中运行
// 简洁高效


// arr.includes()
let arr = [null, undefined, '', 0, NaN, false, {}, []]

// console.log('arr.includes(null):', arr.includes(null))
// console.log('arr.includes(undefined):', arr.includes(undefined))
// console.log('arr.includes(""):', arr.includes(''))
// console.log('arr.includes(0):', arr.includes(0))
// console.log('arr.includes(NaN):', arr.includes(NaN))
// console.log('arr.includes(false):', arr.includes(false))
// console.log('arr.includes({}):', arr.includes({}))
// console.log('arr.includes([]):', arr.includes([]))




// arr.filter()
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



// arr.every()
// 未完待续





// arr.sort()
// 未完待续




// arr.find()
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