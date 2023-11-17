/* 查询字符串 URLSearchParams 原生js
https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams */

const params = new URLSearchParams()

// 插入一个键值对
params.append('name', 'xiaohuang')
params.append('age', 18)
params.append('teshuzifu', 'abc#xyz+123')

// for (const [k, v] of params) { // params.entries() 效果一样
//   console.log(k, v)
// }

const queryString = params.toString() // 转成查询字符串键值对(k=v&k=v), 这是原生语法
const obj = Qs.parse(queryString) // 把查询字符串转成obj结构

/* 如果查询参数的值包含特殊字符，例如空格、+、#、=等，需要使用 encodeURIComponent 函数进行编码 */
const encodeUrl = encodeURIComponent(queryString)
const decodeUrl = decodeURIComponent(encodeUrl)

/* encodeURI 自身无法产生能适用于 HTTP GET 或 POST 请求的 URI，例如对于 XMLHTTPRequests，因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。然而encodeURIComponent这个方法会对这些字符编码。 */

console.log(
  params,

  /* 返回一个迭代器 */
  // params.entries(),

  // queryString,
  // obj,
  encodeUrl,
  decodeUrl,

  // encodeURI(queryString) // 不推荐用
)