<template>
  <!-- 关键是这两个 class -->
  <!-- 大小是字体控制, 颜色可改 -->
  <div class="iconfont icon-alarm"></div>
  <hr />
</template>

<script>

// import autoAddNum from './composables/autoAddNum'
// import Child from './components/child.vue'

export default {
  name: 'three',
  components: {
    // Child
  },
  setup() {

    return {
      // ...(autoAddNum()),
    }
  }
}
</script>

<style scoped>
div {
  font-size: 30px;
  color: deepskyblue;
}
</style>