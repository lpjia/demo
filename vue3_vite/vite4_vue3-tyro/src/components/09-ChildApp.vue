<template>
  <table>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>操作</th>
    </tr>
    <tr v-for="(item, i) in list" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.age }}</td>
      <td>
        <slot name="btns" :i="i">如果父组件没填坑</slot>
      </td>
    </tr>
  </table>
</template>

<script setup lang='ts'>

interface Ls {
  list: Table.ListItem[]
}
/* 接口或对象字面类型可以包含从其他文件导入的类型引用，
但是，传递给 defineProps 的泛型参数本身不能是一个导入的类型 */
defineProps<Ls>()
/* 减少声明写法 */
// defineProps<{
//   list: {
//     name: string,
//     age: number,
//     id: number,
//   }[]
// }>()

/* 这里再用运行时声明就不合适了, 推断会有问题 */
// defineProps({
//   list: {
//     type: Array
//   }
// })
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse; // 使用合并的边框来绘制表格
  // width: 90%;
}

th,
td {
  font-weight: normal;
  padding: 10px;
  border: 2px solid deepskyblue;
}
</style>
