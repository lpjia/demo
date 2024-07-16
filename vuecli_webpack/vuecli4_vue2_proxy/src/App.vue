<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <h3>vuecli4+vue2 用proxy来解决跨域</h3>
    <div>
      <button @click="getDataByFetch">req</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    /* cors 方案 */
    /* 去掉proxy配置
    请求路径要填写完整 */
    // async getDataByFetch() {
    //   const result = await (await fetch('http://localhost:7010/api/test')).json()
    //   console.log('result:', result)
    // },

    /* 无pathRewrite配置项
    请求/api/test */
    async getDataByFetch() {
      const result = await (await fetch('/api/test')).json()
      console.log('result:', result)
    },

    /* 有pathRewrite配置项
    请求/api/api/test */
    // async getDataByFetch() {
    //   const result = await (await fetch('/api/api/test')).json()
    //   console.log('result:', result)
    // },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
