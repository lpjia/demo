<template>
  <div id="app">
    <h1 @click="handleClick">Hello, Vue-Cli-4</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleClick() {
      const arr = new Array(100000).fill(0)
      console.log(arr)
      // return arr
    }
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
