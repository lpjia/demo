/* nums数组中包含1个或多个正整数
其他的数字都出现2次
只有1个数字只出现了1次
找出只出现了1次的数字 */
function uniqueNumber(nums) {
  return nums.reduce((acc, cur) => acc ^ cur, 0)

  // let result = 0
  // for (const num of nums) {
  //   result ^= num
  // }
  // return result
}
const nums = [3, 3, 2, 5, 1, 5, 2]
// 先交换, 相同数字放一起运算, 自然结果就出来了
console.log(
  uniqueNumber(nums)
)

/* 异或 ^
相同数字^, 结果为0
0和任何数字^, 结果为那个数字
^满足交换律 */