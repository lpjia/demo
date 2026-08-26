<template>
  <div class="modal">
    <div class="box">
      <div class="text">{{ msg }}</div>
      <Button @click="emit('click')">关闭</Button>
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue';
const emit = defineEmits(['click']);

defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 45%);
}

.box {
  box-sizing: border-box;
  width: min(360px, 100%);
  padding: 28px 24px 22px;
  border-radius: 8px;
  background: #fff;
  box-shadow:
    0 18px 48px rgb(0 0 0 / 18%),
    0 2px 8px rgb(0 0 0 / 8%);
  text-align: center;
}

.text {
  margin-bottom: 22px;
  color: #303133;
  font-size: 16px;
  line-height: 1.6;
  word-break: break-word;
}
</style>
