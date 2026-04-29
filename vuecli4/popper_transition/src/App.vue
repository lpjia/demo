<template>
  <div id="app">
    <PopperTransition />
  </div>
</template>

<script>
// import PopperTransition from "./components/PopperTransition.vue";
import PopperTransition from "./components/PopperTransitionScoped.vue";

export default {
  name: "App",
  components: {
    PopperTransition,
  },
};
</script>

<style scoped>
/* 样式穿透和样式隔离 */
.a .b ::v-deep .c {
  font-size: 20px;
}
</style>
