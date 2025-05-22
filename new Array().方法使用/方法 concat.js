// 连接数组或任意值, 返回新数组, 不改变原数组

/* arr.concat()
任意个数的参
  参为数组时, 会自动解构, 按顺序一个个连接
  参为其他值时, 直接连接
返回连接后的新数组 */

const arr1 = ['a', 'b', 'c']
const arr2 = ["d", "e", "f"]
const arr3 = arr1.concat(arr2)
const arr4 = arr1.concat(arr2, { name: 'dui_xiang' }, '0', [1, 2, 3], 444)
console.log(
  arr3, '\n',
  arr4, '\n',
)