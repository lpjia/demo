// 对数组的项进行"累加"操作, 返回操作后的结果

/* arr.reduce()
一参是回调, 二参是initialValue
回调的参多, 描述也多, 建议看文档
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#%E8%AF%AD%E6%B3%95
返回"累加"操作后的结果 */


// 数字运算
const array1 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);
console.log('sumWithInitial:', sumWithInitial)


// 对象属性"累加"
function arrToObj(arr, { k = 'value', v = 'name' } = {}) {
  const objKeyValue = arr.reduce(
    (acc, cur) => {
      acc[cur[k]] = cur[v]
      return acc
    },
    {}
  )
  return objKeyValue
}
const arr = [
  { name: '这是name', value: 'kkk' },
  { name: '这是name2', value: 'kkk2' },
  { name: '这是name3', value: 'kkk3' },
]
console.log('arrToObj(arr):', arrToObj(arr))


// 商品累加
// 这里是伪代码, 只看用法
this.goods.reduce(
  (accu, curr) => accu + curr.getTotalPrice(),
  this.deliveryPrice
);