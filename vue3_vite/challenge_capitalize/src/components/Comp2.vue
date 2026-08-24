<template>
  <div>
    <input type="text" v-model.capitalize="v" />
    <br />
    <input type="text" v-model="v" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const v = ref('');
</script>

<style scoped></style>
