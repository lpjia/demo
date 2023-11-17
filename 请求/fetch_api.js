/* get请求 */
const url = "http://localhost:7010/api/student?" + Qs.stringify({ kkk: 'vvv' })
const response = await fetch(url);
if (!response.ok) throw new Error('response failed')
const res = await response.json();
console.log('res:', res)


/* post请求 */
// const user = {
//   name: 'John',
//   surname: 'Smith'
// };
// const url = "http://localhost:7010/api/student"
// const response = await fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user) // obj结构得转成json字符串
// });
// if (!response.ok) throw new Error('response failed')
// const res = await response.json();
// console.log('res:', res)