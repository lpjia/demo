<script setup lang="ts">
const count_2 = ref(0)

function add() {
  count_2.value++
}
</script>

<template>
  <el-button type="warning">warning</el-button>
  <el-button type="danger" @click="add">count is {{ count_2 }}</el-button>
</template>

<style lang="scss" scoped>
</style>
