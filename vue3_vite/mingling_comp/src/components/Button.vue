<template>
  <button class="blue-button" type="button" @click="handleClick">
    <slot>Button</slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);

const handleClick = (e) => {
  emit('click', e);
};
</script>

<style scoped>
.blue-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  border: 1px solid #409eff;
  border-radius: 4px;
  background: #409eff;
  color: #fff;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.blue-button:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}

.blue-button:active {
  background: #337ecc;
  border-color: #337ecc;
}

.blue-button:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 3px rgb(64 158 255 / 22%);
}
</style>
