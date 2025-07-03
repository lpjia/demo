// 对数组的项进行"累加"操作, 返回操作后的结果

/* arr.reduce()
一参是回调, 二参是 initialValue
回调的参多, 描述也多, 建议看文档
reduce 减少的意思, 我理解为减少数组项
reduce 方法, 不遍历空数组, 直接返回二参传的初始值
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#%E8%AF%AD%E6%B3%95

返回"累加"操作后的结果 */


/* reduce 的核心思想是通过遍历数组，将多个值“归并”为一个结果 */

/* reduce {从左到右} 和 reduceRight {从右到左}
最好要传初始值, 否则数组第一项不会参与回调(直接作为初始值, 跳过这次回调)
reduce 数组第一项不参与回调
reduceRight 数组最后一项不参与回调 */

/* 一般给初始值initialValue, 回调内无法退出循环, 不能用break; */

// 数字运算
const array1 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);
const sumWithInitial_2 = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue.toString(10),
  initialValue
);
const sumWithInitial_3 = array1.reduceRight(
  (accumulator, currentValue) => accumulator + currentValue.toString(10),
  initialValue
);
const sumWithInitial_4 = array1.reduceRight(
  (accumulator, currentValue) => accumulator + currentValue.toString(10),
) + '0'
console.log(
  sumWithInitial // 10
  , sumWithInitial_2 // '01234'
  , sumWithInitial_3 // '04321'
  , sumWithInitial_4 // '43210'
)
console.log('---- 分割线 ----\n\n\n')



// 对象属性"累加"
function arrToObj(arr, { k = 'value', v = 'name' } = {}) {
  return arr.reduce(
    (accu, curr) => {
      accu[curr[k]] = curr[v]
      return accu
    },
    {}
  )
}
const arr = [
  { name: '这是name2', value: 'kkk2' },
  { name: '这是name', value: 'kkk' },
  { name: '这是name3', value: 'kkk3' },
]
console.log(
  arrToObj(arr) // {kkk2: '这是name2', kkk: '这是name', kkk3: '这是name3'}
)
console.log('---- 分割线 ----\n\n\n')




console.log();
`
// 商品累加
// 这里是伪代码, 只看用法
this.goods.reduce(
  (accu, curr) => accu + curr.getTotalPrice(),
  this.deliveryPrice
);
`