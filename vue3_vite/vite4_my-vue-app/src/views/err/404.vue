<template>
  <div class="container">
    <div class="wrap">
      404, 不存在此页面
    </div>
  </div>
</template>

<script setup lang='ts'>
// import * as common from '@/utils/commonMethods.js'
// console.log(common.getStorage('token'))
</script>

<style scoped lang="scss">
.container {
  // css变量
  --custom-height: calc(100vh - 60px);

  height: var(--custom-height);
  width: 100%;
  line-height: var(--custom-height);
  text-align: center;
}
</style>
