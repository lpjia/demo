// 排序, 需要一个排序规则

/* arr.sort()
参一般是箭头函数居多
返回排序后的数组, 其实数组已原地排序 */

/* sort 会改变原数组, 所以可直接用原数组继续往下处理, 可不用变量来存 */

/* arr.sort((a,b) => a - b) 该写法就是升序
意思就是 a < b, 则 a - b < 0 ,升序(越往后越大), 也就是 a - b
同理, a > b, 降序, 也就是 b - a
相等就不用排序 */

/* 简单记忆, 两个参相对位置一致则升序, 否则降序 */


// 简单类型数组
const arrNum = [45, 32, 62, 12, 34, 52]
console.log(
  arrNum.sort((a, b) => a - b)
)


// 以对象中的某一属性值来排序
const items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 100 },
  { name: 'Zeros', value: 37 }
]
console.log(
  items.sort((a, b) => a.value - b.value) // 升序
)




// 想让cityList按照字典顺序排序, 拼音顺序
const cityList = ['上海', '北京', '郑州', '广州', '深圳', '新乡']
console.log(
  // cityList.sort(), // 不是我们想要的顺序(默认是编码顺序, 不管它, 一般传处理函数)
  cityList.sort((a, b) => a.localeCompare(b)) // 按字典顺序
  // localeCompare 方法可以实现排序规则, a b 相对位置一致则升序
)
console.log(
  cityList
)




// 某一乱序字符串, 想要排序
const str = 'kjadfnvbfnvbdedetojihfhvbdedsfngkadsfnvbdeghzqwptodsfnbmkdsfnjqnwtojihbdhoaij'
const arrStr = str.split('') // 转成字符串数组
arrStr.sort((a, b) => a.localeCompare(b)) // 字典顺序升序
console.log(
  arrStr.join('') // 数组的项连接成字符串
)


const str2 = 'kjadfnvbfnvbdedetojihfhvbdedsfngkadsfnvbdeghzqwptodsfnbmkdsfnjqnwtojihbdhoaij'
const arrStr2 = str.split('') // 转成字符串数组
const arrUniqueStr = [...new Set(arrStr2)] // 去重
arrUniqueStr.sort((a, b) => a.localeCompare(b)) // 字典顺序升序
console.log(
  arrUniqueStr.join('') // 数组的项连接成字符串
)