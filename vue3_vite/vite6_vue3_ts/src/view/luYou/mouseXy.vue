<template>
  <div>
    <p>这是mouseXy页面, Mouse position is at: {{ x }}, {{ y }}</p>
    <p>使用vueuse的useMouse, Mouse position is at: {{ x2 }}, {{ y2 }}</p>
  </div>
</template>

<script setup lang='ts'>
import { useMouse } from '@/hook/useMouse'
import { useMouse as useMouse2 } from '@vueuse/core'

const { x, y } = useMouse()
const { x: x2, y: y2 } = useMouse2()

</script>

<style scoped lang="scss"></style>
