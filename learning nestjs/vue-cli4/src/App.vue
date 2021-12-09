<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" style="width: 60px; height: 60px;">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <TestLodash />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestLodash from './components/TestLodash.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TestLodash
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
