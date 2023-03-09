// 遍历数组, 判断一个数组是否包含一个指定的值

/* arr.includes()
一参是搜索项, 二参是起始搜索索引(可选)
i示意[0, 1, 2, ...]      [-4, -3, -2, -1]
返回布尔值 */

/* arr.includes(item, from)
从索引 from 开始搜索 item，如果找到则返回 true（译注：如果没找到，则返回 false）。
请注意，这些方法使用的是严格相等 === 比较。但是 NaN 特殊, 在这是返回 true */

/* 使用 includes() 比较字符串和字符时是区分大小写的。 */

/* https://www.runoob.com/jsref/jsref-includes.html */
/* https://zh.javascript.info/array-methods#indexoflastindexof-he-includes */
/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes */

// 注意看六种假值的判定结果
const arr = [null, undefined, '', 0, NaN, false, {}, []]
console.log("arr.includes(null):",
  arr.includes(null)
)
console.log("arr.includes(undefined):",
  arr.includes(undefined)
)
console.log("arr.includes(''):",
  arr.includes('')
)
console.log("arr.includes(0):",
  arr.includes(0)
)
console.log('NaN === NaN:', NaN === NaN)
console.log("arr.includes(NaN):",
  arr.includes(NaN) // true 注意和上面区分
)
console.log("arr.includes(false):",
  arr.includes(false)
)
console.log("arr.includes({}):",
  arr.includes({}) // 引用类型, 地址不一样
)
console.log("arr.includes([]):",
  arr.includes([]) // 引用类型, 地址不一样
)
console.log('---- 分割线 ----\n')

// 地址一样就判定为true
const obj = { name: 'obj' }
const arr2 = [222]
const arr3 = [obj, arr2]
console.log("arr3.includes(obj):",
  arr3.includes(obj)
)
console.log("arr3.includes(arr2):",
  arr3.includes(arr2)
)
console.log('---- 分割线 ----\n')



// string相同用法, 一起记
/* str.includes()
一参是搜索的字符串, 二参是起始搜索索引(可选)
返回布尔值 */

/* 一参不能是正则表达式, 否则报错 */

const str = 'aldfsjkjdhgfksdfsdfsadgasd'
console.log(
  str.includes('gf')
)