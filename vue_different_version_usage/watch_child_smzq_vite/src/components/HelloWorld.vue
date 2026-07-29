<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String,
})

onMounted(() => {
  console.log('child component mounted')
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
