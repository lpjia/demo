
/* 快速创建数组(批量数组项)
Array(给数组长度).fill(填充数组项)
前面加不加new都可以, 推荐不加 */

Array(10).fill() // 数组项填充undefined, 函数不传实参, 其实就是传undefined
Array(10).fill(null)

/* null和undefined都占内存
空槽不占 */

Array(10); // [empty × 10]

/* 稀疏数组, 索引不连续
空槽和undefined不一样
  undefined表示有东西, 但值为 undefined
  空槽表示没有东西
*/

// 最后一个逗号后面不算, 只算它前面的
[10, 20, 30, , ,]; // [10, 20, 30, empty × 2]


/* 稀疏数组的优势
如果需要一个长度极大但大部分位置无数据的数组，稀疏数组能大幅节省内存（密集数组会为每个位置存储undefined，占用内存） */


// 注意!!!
/* 稀疏数组的 “空槽” 会导致部分数组方法跳过空槽
遍历方法：forEach、map、filter 会跳过 empty  */
[10, 20, 30, , ,].forEach(item => console.log(item)); // 依次打印 10 20 30
/* 长度问题：arr.length 是最大索引 + 1，而非实际有值元素的数量 */
[10, 20, 30, , ,].length; // 5
/* 转换问题：Object.keys(arr) 仅返回有值的索引（字符串形式），
Array.from(arr) 会将 empty slots 转为undefined */
Object.keys([10, 20, 30, , ,]); // [0, 1, 2]

/* 解决方案: 将稀疏数组转为密集数组
  数组解构...
  Array.from()
*/
[...[10, 20, 30, , ,]]; // [10, 20, 30, undefined, undefined]







/**
 * arr.flatMap()
 */
let arr9 = [
  { name: 'one', val: 1 },
  { name: 'five', val: 5 },
  { name: 'three', val: 3 },
  { name: 'two', val: 2 },
  { name: 'four', val: 4 },
]
// 参数和 map 方法使用一致
arr9.flatMap(item => {
  return item.val > 3 ? [item] : []
})
// 返回 [ { name: 'five', val: 5 }, { name: 'four', val: 4 }, ]
// 实际上这个例子算是 map + filter + flat 的结合