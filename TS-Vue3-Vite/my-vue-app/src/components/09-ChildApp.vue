<script setup lang='ts'>
interface ListItemItf {
  name: string,
  age: number,
  id: number,
}
interface ListItf {
  list: ListItemItf[]
}
defineProps<ListItf>()
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
