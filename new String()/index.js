

/**
 * 构建重复字符串
 * 可组装大字符串数据用来测试
 */
console.log(
  'abc'.repeat(30)
)
console.log('---- 分割线 ----\n\n\n')



/**
 * 查找元素, 参是索引
 * 只能找单个字符
 * at(-x), -x表示从右向左计数, -1表示倒数第1个, -2表示倒数第2个
 */
let str = 'ProductTable.module.scss'
const arr = str.split('.')
console.log(
  str.at(-3) // 'c'
  , str.at(80) // undefined 
)
console.log('---- 分割线 ----\n\n\n')

console.log(
  // 数组也有at方法 arr.at(), 用法和 str.at() 一致
  arr // ['ProductTable', 'module', 'scss']
  , arr.at(-1) // 'scss'
  , arr[arr.length - 1] // 'scss'
)
console.log('---- 分割线 ----\n\n\n')


// 2025-06-18 04:51 星期三
// 以上内容是这个时间点写的







/**
 * 用 apply 把数组转为多个参的形式
 */
let c = 'hello '
  , c2 = 'world'
  , c3 = []
for (let item of c.concat(c2)) {
  c3.push(item.charCodeAt())
}
console.log('c3: ', c3)

let c4 = String.fromCharCode.apply(null, c3)
console.log('c4: ', c4)
console.log('typeof c4: ', typeof c4)
console.log('---- 分割线 ----\n\n\n')





/**
 * fromCharCode()
 * 将 Unicode 编码转为字符。
 */
let b = String.fromCharCode(72, 69, 76, 76, 79)
console.log('b: ', b)
console.log('typeof b: ', typeof b)
console.log('---- 分割线 ----\n\n\n')




/**
 * charCodeAt()
 * 返回在指定的位置的字符的 Unicode 编码。
 */
let a = 'A'.charCodeAt()
  , a2 = 'Z'.charCodeAt()
  , a3 = 'a'.charCodeAt()
  , a4 = 'z'.charCodeAt()
  , a5 = '0'.charCodeAt()
  , a6 = '9'.charCodeAt()
console.log('a: ', a)
console.log('typeof a: ', typeof a)
console.log('a2: ', a2)
console.log('a3: ', a3)
console.log('a4: ', a4)
console.log('a5: ', a5)
console.log('a6: ', a6)
console.log('---- 分割线 ----\n\n\n')