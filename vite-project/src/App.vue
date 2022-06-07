<script setup lang="ts">
import LearnPinia from './views/learn-pinia/index.vue';
import CompareSetup from './views/compare-setup/index.vue';
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hr>
  <CompareSetup />
  <hr>
  <LearnPinia />
  <router-view />


</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
