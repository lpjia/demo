<template>
  <!-- <div class="container" :style="{ backgroundImage: `url(/assets/img/${name}.png)` }"> -->
  <div class="container" :style="{ backgroundImage: `url(${url})` }">
    <TypeSelector @change="handleChange"></TypeSelector>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import TypeSelector from './components/TypeSelector.vue'

/* 最笨的方法(不采用, 可以学习其中的知识) */
// import name1 from './assets/img/1.png'
// import name2 from './assets/img/2.png'
// console.log(name1)
// console.log(name2)

const name = ref(1)

/* 动态导入 */
// watchEffect(async () => {
//   const module = await import(`./assets/img/${name.value}.png`)
//   console.log(module)
// })


console.log('import.meta.url:', import.meta.url) // 当前模块的基准路径
/* 原生URL构造函数, 推荐 */
const url = computed(() => {
  const obj = new URL(`./assets/img/${name.value}.png`, import.meta.url)
  console.log(obj)
  return obj.pathname
})

function handleChange(val: number) {
  console.log(val)
  name.value = val
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 30px;
  // background-image: url('./assets/img/1.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
