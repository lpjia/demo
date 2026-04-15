// 浅拷贝数组, 切片

/* arr.slice()
一参是 startIndex(可选), 二参是 endIndex(可选)
slice(startIndex, endIndex), 切片范围类似随机数 0-1, 但取不到1
不传参代表浅拷贝整个数组
slice(-x), -x表示从右向左计数, -1表示倒数第1个, -2表示倒数第2个
slice(x, -y), slice方法始终排除指定的最后一个索引处的元素，无论它是正数还是负数。

返回一个新数组 */


let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(
  arr.slice() // [1, 2, 3, 4, 5, 6, 7, 8, 9]
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  arr.slice(0, 3) // 返回 [1, 2, 3]
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  arr.slice(-2) // 返回 [8, 9]
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  arr.slice(2, -3) // 返回 [3, 4, 5, 6]
)
console.log('---- 分割线 ----\n\n\n')


/* str.slice()
用法差不多 */