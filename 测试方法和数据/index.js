import { reverseMapping, manyToOne } from '../util/commonMethod.js'
import { getImgGroupByDevice } from '../util/commonData.js'
import diff from '../util/diff.js'




// 可以用 number 类型
let a = getImgGroupByDevice(1)
console.log('a: ', a)
console.log('typeof a: ', typeof a)
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
const aa = JSON.stringify(difference)
console.log('JSON.stringify(): ', JSON.stringify())
console.log('JSON.parse(aa): ', JSON.parse(aa))
console.log('---- 分割线 ----\n\n\n')



// 反向映射, 对于数组是把索引和值反向了
const b = ['10', '11', '13', '11']
const c = reverseMapping(b)
const d = c['11']
console.log('c: ', c)
console.log('JSON.stringify(c): ', JSON.stringify(c))
console.log('d: ', d)
console.log('JSON.stringify(d): ', JSON.stringify(d))
console.log('---- 分割线 ----\n\n\n')