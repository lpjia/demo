<template>
  <input type="text" v-model="model" />
</template>

<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
});
</script>

<style scoped></style>
