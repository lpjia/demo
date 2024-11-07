<template>
  <input type="text" v-model="formData.one">
  <input type="text" v-model="formData.two">
  <span>{{ formData.one }}</span>
  <span>{{ formData.two }}</span>
  <hr>
  <input type="text" v-bind:value="formData.one" @input="event => formData.one = event.target.value">
  <input type="text" v-bind:value="formData.two" @input="event => formData.two = event.target.value">
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 定义obj来绑定表单项, 不要用数组
const formData = ref({
  one: null,
  two: null
})

onMounted(() => {
  // 模拟从后台接口获取数据
  setTimeout(() => {
    const data = [{ txt: '1234' }, { txt: '7890' }]

    // 赋值
    formData.value.one = data[0]?.txt
    formData.value.two = data[1]?.txt
  }, 500)
})
</script>

<style scoped></style>
