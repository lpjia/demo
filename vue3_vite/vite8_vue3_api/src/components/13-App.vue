<template>
  <app-child @zdy-handle="fn"></app-child>
</template>

<script setup>
import AppChild from './13-ChildApp.vue';

function fn(e) {
  console.log('子 触发自定义事件:', e);
}
</script>

<style scoped></style>
