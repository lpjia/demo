<template>
  <!-- 在template上直接触发自定义事件, $emit() -->
  <button @click="$emit('zdyHandle', '传值', '多个参数')">click me</button>
</template>

<script setup lang='ts'>
</script>

<style scoped lang="scss"></style>
