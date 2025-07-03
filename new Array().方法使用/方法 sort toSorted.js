// 排序, 需要一个排序规则


/* arr.toSorted()
一参是回调, (a,b) => a - b 该写法就是升序, 越往后越大, a < b, a - b < 0
简单记忆, 两个参相对位置一致则升序, 否则降序
不会改变原数组

返回排序后的新数组 */


// 简单类型数组
const arr = [45, 32, 62, 12, 34, 52]
console.log(
  arr.toSorted((a, b) => a - b) // [12, 32, 34, 45, 52, 62]
  , arr // [45, 32, 62, 12, 34, 52] 原数组没变
)
console.log('---- 分割线 ----\n\n\n')



/* arr.sort()
一参是回调, (a,b) => a - b 该写法就是升序, 越往后越大, a < b, a - b < 0
简单记忆, 两个参相对位置一致则升序, 否则降序
会改变原数组, 数组已原地排序, 可直接用原数组继续往下处理, 可不用变量来存

返回排序后的数组 */

console.log(
  arr.sort((a, b) => b - a) // [62, 52, 45, 34, 32, 12] 
  , arr // [62, 52, 45, 34, 32, 12] 原数组已改
)
console.log('---- 分割线 ----\n\n\n')




// 以对象中的某一属性值来排序
const items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 100 },
  { name: 'Zeros', value: 38 }
]
console.log(
  // [{"name":"The","value":-12},{"name":"Edward","value":21},{"name":"Sharpe","value":37},{"name":"Zeros","value":38},{"name":"And","value":45},{"name":"Magnetic","value":100}]
  JSON.stringify(items.toSorted((a, b) => a.value - b.value)) // 升序
  , '----'
  , JSON.stringify(items)
  // [{"name":"Edward","value":21},{"name":"Sharpe","value":37},{"name":"And","value":45},{"name":"The","value":-12},{"name":"Magnetic","value":100},{"name":"Zeros","value":38}]
)
console.log('---- 分割线 ----\n\n\n')




// 想让cityList按照字典顺序排序, 拼音顺序
const cityList = ['上海', '北京', '郑州', '广州', '深圳', '新乡', '重庆']
console.log(
  // cityList.sort(), // 不是我们想要的顺序(默认是编码顺序, 不管它, 一般传处理函数)
  /* localeCompare 方法可以实现排序规则, a b 相对位置一致则升序 */
  cityList.toSorted((a, b) => a.localeCompare(b)) // 按字典顺序
  // ['北京', '重庆', '广州', '上海', '深圳', '新乡', '郑州']

  , cityList // ['上海', '北京', '郑州', '广州', '深圳', '新乡', '重庆']
)
console.log('---- 分割线 ----\n\n\n')




// 某一乱序字符串, 想要排序
const str = 'kjadfnvbfnvbdedetojihfhvbdedsfngkadsfnvbdeghzqwptodsfnbmkdsfnjqnwtojihbdhoaij'
console.log(
  // 转成字符串数组 字典顺序升序 数组的项连接成字符串
  str.split('').toSorted((a, b) => a.localeCompare(b)).join('')
  // aaabbbbbbddddddddddeeeefffffffgghhhhhiiijjjjjkkkmnnnnnnnoooopqqsssstttvvvvwwz
  , '----'
  // kjadfnvbfnvbdedetojihfhvbdedsfngkadsfnvbdeghzqwptodsfnbmkdsfnjqnwtojihbdhoaij
  , str
)
console.log('---- 分割线 ----\n\n\n')



console.log(
  // 转成字符串数组 Set去重 字典顺序升序 数组的项连接成字符串
  [...new Set(str.split(''))].toSorted((a, b) => a.localeCompare(b)).join('')
  // abdefghijkmnopqstvwz
  , '----'
  // kjadfnvbfnvbdedetojihfhvbdedsfngkadsfnvbdeghzqwptodsfnbmkdsfnjqnwtojihbdhoaij
  , str
)
console.log('---- 分割线 ----\n\n\n')