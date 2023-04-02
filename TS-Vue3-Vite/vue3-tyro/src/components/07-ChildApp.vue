<script setup lang='ts'>
// 使用"运行时声明"
const props = defineProps({
  num: { type: Number, default: 0 }
})
// update:xxx 固定写法
// 不限制类型的最简写法
const emit = defineEmits(['update:num'])

let n = props.num
const changeNum = () => {
  n++
  emit('update:num', n)
}
</script>

<template>
  <div>
    这是子组件 {{ num }}
  </div>
  <button @click="changeNum">按钮</button>
</template>

<style scoped lang="scss"></style>
