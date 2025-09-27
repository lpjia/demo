<template>
  <luYou />
</template>

<script setup lang="ts">
console.log(import.meta.env.VITE_APP_BASE_URL)
console.log(import.meta.env.NODE_ENV)
console.log(import.meta.env.VITE_NODE_ENV)

import luYou from '@/view/luYou/index.vue'
</script>

<style scoped lang="scss"></style>
