<script setup lang='ts'>
import { ref } from "vue";
import ChildApp from "./07-ChildApp.vue";

const num = ref(20)
</script>

<template>
  <h3>父子组件传值 v-model</h3>
  {{ num }}
  <child-app v-model:num="num"></child-app>
</template>

<style scoped lang="scss"></style>
