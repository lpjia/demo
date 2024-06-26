<template>
  <div v-color="`white`" v-bgColor="`deepskyblue`">
    123

    <!-- <div class="cls">111</div> -->

    afasd
  </div>
</template>

<script setup lang='ts'>
import { DirectiveBinding } from 'vue';

/* 局部自定义指令 */
// 在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令
const vColor = (el: HTMLElement, binding: DirectiveBinding) => {
  el.style.color = binding.value
}
</script>

<style scoped lang="scss"></style>
