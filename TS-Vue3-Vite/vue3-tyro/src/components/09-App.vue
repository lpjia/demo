<template>
  <h3>作用域插槽 案例</h3>
  <!-- Teleport标签能够把里面的标签传送到指定标签的最后位置 -->
  <Teleport to="h3">
    <p>这是父组件的p标签, 传送中...</p>
  </Teleport>
  <my-table :list="list">
    <template v-slot:btns="scope">
      <button @click="clk(scope.i)">编辑</button>
    </template>
  </my-table>
  <hr>
  <my-table :list="list">
    <template #btns="{ i }">
      <button @click="clk(i)">编辑</button>
      <button @click="del(i)">删除</button>
    </template>
  </my-table>
</template>

<script setup lang='ts'>
import { reactive } from "vue";
import MyTable from "./09-ChildApp.vue";
// 导入类型
import type { Person } from "@/types/list"; // 路径不能有.ts后缀

/* 定义泛型, 可以纠错 */
const list = reactive<Person[]>([
  { name: '小明', age: 18, id: 1 },
  { name: '小红', age: 20, id: 2 },
])

const clk = (i: number) => {
  console.log(list[i])
}
const del = (i: number) => {
  alert('禁止删除')
  console.log(list[i])
}
</script>

<style scoped lang="scss"></style>
