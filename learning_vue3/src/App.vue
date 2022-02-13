<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Zh />
  <Zhh />
  <Xxs />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Zh from '@/views/zuhe/zh'
import Zhh from '@/views/zuhe/zh2'
import Xxs from '@/views/zuhe/xxs'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Zh,
    Zhh,
    Xxs
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
