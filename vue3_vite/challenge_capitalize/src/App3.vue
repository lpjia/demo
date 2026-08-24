<template>
  <Comp v-model.capitalize="v" />
</template>

<script setup>
import { ref } from 'vue';
import Comp from './components/Comp3.vue';

const v = ref('');
</script>

<style scoped></style>
