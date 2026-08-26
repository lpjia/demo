<template>
  <div class="btn">
    <Button @click="clk">显示提示框</Button>
  </div>
</template>

<script setup>
import Button from './components/Button.vue';
import showMsg from './utils/showMsg.js';

function clk() {
  const close = showMsg('弹窗里的ctt', () => {
    close();
  });
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
