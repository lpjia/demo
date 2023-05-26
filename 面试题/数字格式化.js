// 转成 '10,000,000' 美式表示
const str = '10000000000'


// 简单点, Number.prototype.toLocaleString() 兼容性很好
const result = Number(str).toLocaleString()
// console.log(result, typeof result)


// 循环
const reverseStr = str.split().reverse().join()
console.log('reverseStr:', reverseStr)
// const startIdx = str.length - 1
const splitNum = 3


// 装逼用
