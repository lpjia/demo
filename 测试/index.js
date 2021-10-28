// import judgeNotEmpty, { o } from '../test.js'
// console.log(o)
// console.log(judgeNotEmpty({}))


let url = "http://rap2api.taobao.org/app/mock/288967/api/random"
let response = await fetch(url);

if (!response.ok) throw new Error('response failed')
let res = await response.json();
console.log('res:', res)




// import { judgeNotEmpty } from '../global/globalFn.js'
// console.log(judgeNotEmpty({}))



// import diff from '../util/diff.js'
// let curr = {
//   a: 1,
//   b: 2,
//   c: "str",
//   d: {
//     e: [2, { a: 4 }, 5]
//   },
//   f: true,
//   h: [1],
//   g: {
//     a: [1, 2],
//     j: 111
//   }
// };
// let prev = {
//   a: [],
//   b: "aa",
//   c: 3,
//   d: {
//     e: [3, { a: 3 }]
//   },
//   f: false,
//   h: [1, 2],
//   g: {
//     a: [1, 1, 1],
//     i: "delete"
//   },
//   k: 'del'
// };

// let dif = diff(curr, prev)


// console.time()
// count = 0;
// for (let i = 1; i <= 10000; i++) {
//   let str = i.toString();
//   let arr = []
//   arr = str.match(/1/g)
//   count += arr ? arr.length : 0
// }
// console.log("1的个数：" + count);
// console.timeEnd()



let a = 'akkKJDGFAGALGJH'
let arr = a.match(/G1F/g)
arr ? arr.length : 0



// console.time()
// function calcCount(num) {
//   // 整
//   let str = num.toString()
//   let strMinus = (num - 1).toString()
//   let digit = str.length
//   let digitMinus = strMinus.length
//   if (digit > digitMinus) return digitMinus * Math.pow(10, digitMinus - 1) + 1
// }
// let count = 0;
// count = calcCount(10000)
// console.log("1的个数：" + count);
// console.timeEnd()