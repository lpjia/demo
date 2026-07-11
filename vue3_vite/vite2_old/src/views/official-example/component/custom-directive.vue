<script lang="ts" setup>

// 在模版中启用 v-focus
const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>

<style lang="scss" scoped>
</style>
