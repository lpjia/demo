/* 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

一般, 大的在左边, 小的在右边, 表示加

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。 */


/* 1 <= s.length <= 15
s 仅含字符 ('I', 'V', 'X', 'L', 'C', 'D', 'M')
题目数据保证 s 是一个有效的罗马数字，且表示整数在范围 [1, 3999] 内
题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。跨位说的是百位不能和个位组合
IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX */

function romanToInt(s) {
  const obj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let nums = []

  /* 拿到单个字符
  通过映射拿到对应的数字
  把数字push到nums中 */
  for (const char of s) {
    nums.push(obj[char])
  }
  /* 然后for循环nums
  双指针去比较
  若较小的数字在较大的数字前面 , 较小的数字前就加负号
  right是否指向了最后一项, 是就加上最后一项的值, 然后退出循环break; */
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    let left = nums[i]
      , right = nums[i + 1]
    sum += left < right ? -left : left
    if (i + 1 >= nums.length - 1) {
      sum += right
      break;
    }
  }
  return sum
}

console.log(
  romanToInt("MCMXCIV")
)

let s = "III" // 1 1 1
// 3

s = "IV" // 1 5
// 4

s = "IX" // 1 10
// 9

s = "LVIII" // 50 5 1 1 1
// 58

s = "MCMXCIV" // 1000 100 1000 10 100 1 5
// 1994