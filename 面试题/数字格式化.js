// 转成 '10,000,000' 美式表示
const str = '100000000000'


// // 简单点, Number.prototype.toLocaleString() 兼容性很好
// const result = Number(str).toLocaleString()
// console.log('result:', result, typeof result)


// // 循环
// const splitNum = 3
// let arrOfReverseStr = str.split('').reverse()
// console.log('arrOfReverseStr:', arrOfReverseStr)
// let douArrOfReverseStr = []
// arrOfReverseStr.map((item, i) => {
//   if (i % splitNum === 0 && i) {
//     douArrOfReverseStr.push(',')
//   }
//   douArrOfReverseStr.push(item)
// })
// console.log('douArrOfReverseStr:', douArrOfReverseStr)
// const result2 = douArrOfReverseStr.reverse().join('')
// console.log('result2:', result2, typeof result2)




// 装逼用, 用正则去替换字符
/* 正则中的前瞻和后顾
https://juejin.cn/post/6946016272245063716 */

// // \d是把所有数字都匹配上
// const allCharacterToDou = str.replace(/\d/g, ',')
// console.log('allCharacterToDou:', allCharacterToDou)

/* 前瞻 (?=), 建议先看《正则中的前瞻和后顾》
不会匹配到某一个具体的字符
在那个位置去往前(匹配的方向)看一看
看一看后面的东西满不满足规则
满足规则, 这个位置就匹配上了
 */
const allPositionToDou = str.replace(/(?=)/g, ',')
console.log('allPositionToDou:', allPositionToDou)

// \d匹配数字
const allPositionExceptLastToDou = str.replace(/(?=\d)/g, ',')
console.log('allPositionExceptLastToDou:', allPositionExceptLastToDou)

// \d{3}匹配3个数字
const allPositionExceptLastThreeToDou = str.replace(/(?=\d{3})/g, ',')
console.log('allPositionExceptLastThreeToDou:', allPositionExceptLastThreeToDou)

// \d{3}$匹配3个数字结尾
const onlyLastThreeNumberToDou = str.replace(/(?=\d{3}$)/g, ',')
console.log('onlyLastThreeNumberToDou:', onlyLastThreeNumberToDou)

// +匹配前面的子表达式一次或多次。要匹配 + 字符，请使用 \+
const perThreeNumberToDou = str.replace(/(?=(\d{3})+$)/g, ',')
console.log('perThreeNumberToDou:', perThreeNumberToDou)

// \b匹配一个单词边界
// \B匹配非单词边界 大写都是非, 建议先看《正则知识》
const result3 = str.replace(/(?=\B(\d{3})+$)/g, ',')
console.log('result3:', result3)


/* 正则知识
https://www.runoob.com/regexp/regexp-metachar.html */