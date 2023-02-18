<script setup lang='ts'>
import { reactive } from "vue";
import MyTable from "./09-ChildApp.vue";

const list = reactive([
  { name: '小明', age: 18, id: 1 },
  { name: '小红', age: 20, id: 2 },
])

const clk = (i: number) => {
  console.log(list[i])
}
</script>

<template>
  <h3>作用域插槽 案例</h3>
  <!-- Teleport标签能够把里面的标签传送到指定标签的最后位置 -->
  <Teleport to="h3">
    <p>这是父组件的p标签, 传送中...</p>
  </Teleport>
  <my-table :list="list">
    <template #btns="{ i }">
      <button @click="clk(i)">编辑</button>
    </template>
  </my-table>
  <hr>
  <my-table :list="list">
    <template #btns>
      <button>编辑</button>
      <button>删除</button>
    </template>
  </my-table>
</template>

<style scoped lang="scss"></style>
