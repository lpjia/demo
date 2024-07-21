<template>
  <div>
    <h3>vite4+vue3+ts 用proxy来解决跨域</h3>
    <div>
      <button @click="getDataByFetch">req</button>
    </div>
  </div>
</template>

<script setup lang='ts'>

/* cors 方案 */

/* 去掉proxy配置
请求路径要填写完整
fetch('http://localhost:7010/api/test') */
/* const getDataByFetch = async () => {
  // const result = await (await fetch('http://localhost:7010/api/test')).json()
  const result = await (await fetch('http://localhost:7001/api/getDataByService')).json()
  console.log('result:', result)
} */


/* --------分割线---------- */
/* proxy 方案 */


/* 无rewrite配置项

请求/api/test
经过proxy后, 请求路径为'本地服务+api路径'
浏览器控制台network查看到的Request URL: http://localhost:5173/api/test
这里http://localhost:5173自动拼接上了/api/test, 5173是vite开发服务器的地址, 实际上fetch('/api/test')
请求成功 */
const getDataByFetch = async () => {
  const result = await (await fetch('/api/test')).json()
  console.log('result:', result)
}


/* 如果用axios封装的话, 记得把baseURL赋值''
请求/api/test, 而不是请求http://localhost:5173/api/test,
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 假设你在.env文件中设置了API的基础URL
  timeout: 5000 // 请求超时时间
});  */


/* 有rewrite配置项

请求/api/api/test
经过proxy后, 请求路径为'本地服务+api路径', 去掉了第一段/api
浏览器控制台network查看到的Request URL: http://localhost:5173/api/api/test
显示的还是代码写的路径, 其实方便在编辑器查找url
但真实的请求路径已变了
请求成功 */
// const getDataByFetch = async () => {
//   const result = await (await fetch('/api/api/test')).json()
//   console.log('result:', result)
// }


</script>

<style scoped lang="scss"></style>
