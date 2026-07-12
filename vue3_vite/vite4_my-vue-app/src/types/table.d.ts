/* 使用命名空间, 减少全局类型/接口的数量, 防止命名冲突
使用类似obj.xxx */
declare namespace Table {
  interface ListItem {
    name: string,
    age: number,
    id: number,
  }
}

// // 导出还没试过, 不过猜测是和ES6一样, 这里只想要全局的声明, 不想写按需导入
// // 按需导出
// export interface ListItem {
//   name: string,
//   age: number,
//   id: number,
// }