<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="increase">count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const msg = 'Foo Script Setup'
const count = ref(0)
function increase() {
  count.value++
}

// defineExpose({ msg, count, increase }) // 手动显式暴露

</script>