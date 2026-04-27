import { Table } from 'element-ui'

const TableExtend = {
  extends: Table, // 这是关键, 扩展组件
  mounted() {
    console.log('这是扩展后的内容')
  }
}

// 以插件的形式
export default {
  install(Vue) {
    Vue.component(Table.name, TableExtend);
    /* 这是导入组件的写法, 注意Table.name */
    // Vue.component(Button.name, Button);
    // Vue.component(Select.name, Select);
    /* 或写为
     * Vue.use(Button)
     * Vue.use(Select)
     */
  }
}