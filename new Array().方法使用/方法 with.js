const arr = [
  { name: 'one', val: 1 },
  { name: 'five', val: 5 },
  { name: 'three', val: 3 },
  { name: 'two', val: 2 },
  { name: 'four', val: 4 },
]

/* arrayInstance.with(index, value)
返回一个新数组, index索引处的数组项被替换掉了 */
console.log(
  arr.with(1, '111'),
  arr
)