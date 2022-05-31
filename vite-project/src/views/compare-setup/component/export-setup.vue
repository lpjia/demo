<script lang="ts">
export default {
  name: 'ExportSetup',
  setup() {
    const count = ref(0)

    function add() {
      count.value++
    }

    return {
      count,
      add
    }
  }
}
</script>

<template>
  <el-button>Default</el-button>
  <el-button type="primary" @click="add">count is {{ count }}</el-button>
</template>

<style lang="scss" scoped>
</style>
