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
const emit = defineEmits<OneItf>()
// emit('zdy', 1)
</script>

<template>
  <div>
    这是子组件 {{ props.num }}, 可以不用声明props变量(直接用num){{ num }}
  </div>
  <button @click="emit('zdy', '从子组件传过来的值')">按钮</button>
</template>

<style scoped lang="scss"></style>
