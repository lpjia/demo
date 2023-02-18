<script setup lang='ts'>
// 使用"基于类型的声明"
interface NumItf {
  num: number
}
const props = defineProps<NumItf>()


interface OneItf {
  (e: 'zdy', val: string): void
}
// 子传父的时候需要先定义好这个方法
const emits = defineEmits<OneItf>()
// emits('zdy', 1)
</script>

<template>
  <div>
    这是子组件 {{ props.num }}
  </div>
  <button @click="emits('zdy', '从子组件传过来的值')">按钮</button>
</template>

<style scoped lang="scss"></style>
