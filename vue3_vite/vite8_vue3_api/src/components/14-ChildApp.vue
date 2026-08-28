<template>
  <!-- 传别的参, 不传$event -->
  <button @click="$emit('zdyHandle', { label: '编辑' }, 111)">click me</button>
</template>

<script setup></script>

<style scoped></style>
