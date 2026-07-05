<template>
  <FooSetup ref="refSetup" />
  <FooScriptSetup ref="refScriptSetup" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FooScriptSetup from './components/FooScriptSetup.vue';
import FooSetup from './components/FooSetup.vue';

const refSetup = ref(null)
const refScriptSetup = ref(null)
onMounted(() => {
  console.log(refSetup.value.msg)
  console.log(refScriptSetup.value.msg)
  console.log('---- 分割线 ----\n\n\n')

  console.log(refSetup.value)
  console.log(refScriptSetup.value)
})
</script>

<style scoped></style>
