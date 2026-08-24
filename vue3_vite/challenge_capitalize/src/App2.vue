<template>
  <div>
    <Comp />
  </div>
</template>

<script setup>
import { ref, vModelText } from 'vue';
import Comp from './components/Comp2.vue';

/* 这个方案使用vue内部变量, 会影响自己和子组件的 v-model.capitalize */
const _vModelText = vModelText;
_vModelText.updated = (el, { value, modifiers }) => {
  if (modifiers.capitalize && value.hasOwnProperty(0)) {
    el.value = value[0].toUpperCase() + value.substring(1);
  }
};
</script>

<style scoped></style>
