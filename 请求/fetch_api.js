import * as qs from 'https://unpkg.com/qs-esm'

/* get请求 */
// const url = "http://localhost:7001/api/goodsByPage?" + qs.stringify({ page: 2, pageSize: 10 })
// const response = await fetch(url); // 只能拿到响应头的信息, await等待一次, 这个时间点, promise完成
// console.log('response:', response)
// console.log(response.headers.get('Content-Type')) // 获取响应体的类型

// if (!response.ok) throw new Error('response failed')
// const res = await response.json(); // await等待响应体传输完成, 以json形式解析 // 还有json、text、blob、arrayBuffer
// console.log('res:', res)


/* post请求 */
const user = {
  name: 'John',
  surname: 'Smith'
};
const url = "http://localhost:7010/api/student"
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user) // obj结构得转成json字符串
});
console.log('response:', response)
console.log(response.headers.get('Content-Type')) // 获取响应体的类型

if (!response.ok) throw new Error('response failed')
const res = await response.json();
console.log('res:', res)