<script setup lang="ts">
/**
 * 为模板 ref 标注类型
 * https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-template-refs
 */
const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>


<template>
  <input ref="el" />
</template>