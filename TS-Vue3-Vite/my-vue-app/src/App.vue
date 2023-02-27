<template>
  <div>
    <router-link to="/home">home</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  color: deepskyblue;
  margin-left: 10px;
}

/* 不能写到scoped中, 有作用域指纹 */
/* :root {
  --custom-height: calc(100vh - 60px);
} */
</style>
