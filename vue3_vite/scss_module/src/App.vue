<script setup lang="ts">
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <span class="cls1">cls1</span>
    <span class="cls2">cls2</span>
  </div>

  <div class="menu">
    <div class="menu-item">1</div>
    <div class="menu-item">2</div>
    <div class="menu-item">3</div>
    <div class="menu-item">4</div>
    <div class="menu-item">5</div>
    <div class="menu-item">6</div>
  </div>
</template>

<style scoped lang="scss">
@import 'styles/app.scss';

.menu {
  width: 140px;
  height: 140px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid deepskyblue;
  border-radius: 50%;

  .menu-item {
    position: absolute;
  }
}

@import 'styles/math.scss';
</style>
