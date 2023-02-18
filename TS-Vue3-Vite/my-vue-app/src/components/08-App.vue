<script setup lang='ts'>
import ChildApp from "./08-ChildApp.vue";

</script>

<template>
  <h3>插槽 具名插槽 作用域插槽</h3>
  <child-app>
    <!-- v-slot必须写到template标签上, 简写是# -->
    <template v-slot:slot_1>
      <a href="javascript:;">这是a标签</a>
    </template>
    <!-- 对于默认插槽, 除了具名插槽, 剩下的可以当做#default -->
    <p>父组件填坑, 填默认插槽</p>
    <!-- 作用域插槽: 在父组件中的子组件标签内部, 获取子组件的数据 -->
    <template #slot_2="scope">
      <!-- scope对象是自定义的, 但是一般都叫scope -->
      <!-- scope专门收集对应的子组件内部的slot标签上的属性作为自己的属性(除了name属性) -->
      <button>这是btn标签、{{ scope.title }}、{{ scope.mynum }}</button>
    </template>

  </child-app>
</template>

<style scoped lang="scss"></style>
