<template>
  <div id="app">
    <!-- <one></one> -->
    <router-link to="/one">toOne</router-link>
    <router-link to=/two>toTwo</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import One from '@/views/one'

export default {
  name: 'App',
  components: {
    One
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 2% 6% 0;
}

.up_down {
  margin: 20px 0;
}

button {
  padding: 4px;
}
</style>