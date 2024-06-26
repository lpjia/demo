/* 使用命名空间, 减少全局类型/接口的数量, 防止命名冲突
使用类似obj.xxx */
declare namespace Table {
  interface ListItem {
    id: number,
    name: string,
    age: number,
  }
}

/* 如果再写了按需导出
09-ChildApp.vue会报错
找不到命名空间“Table” */
// export interface ListItem {
//   name: string,
//   age: number,
//   id: number,
// }