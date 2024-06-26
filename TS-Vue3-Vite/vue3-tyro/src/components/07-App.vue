<template>
  <h3>父子组件传值 v-model</h3>
  {{ num }}
  <hr>
  <child-app v-model:num="num"></child-app>
  <!-- v-model比自定义事件的好处是
  子组件包含所有的处理逻辑, 代码内聚, 父组件不需要再编写代码 -->
</template>

<script setup lang='ts'>
import { ref } from "vue";
import ChildApp from "./07-ChildApp.vue";

const num = ref(20)
</script>

<style scoped lang="scss"></style>
