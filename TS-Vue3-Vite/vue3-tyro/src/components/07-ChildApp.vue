<script setup lang='ts'>
// 使用"运行时声明"
const props = defineProps({
  num: { type: Number, default: 0 } // 比"基于类型的声明"的好处是可直接赋默认值
})
// update:xxx 固定写法
// 不限制类型的最简写法
const emit = defineEmits(['update:num'])

let n = props.num // 用变量保存也能保持响应式
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
