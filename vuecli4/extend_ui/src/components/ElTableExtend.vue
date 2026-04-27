<script>
import { Table } from "element-ui";

// 以组件的形式
export default {
  name: "ElTableExtend",
  extends: Table, // 这是关键, 扩展组件
  mounted() {
    console.log("以.vue文件 扩展后的内容");
  },
};
</script>