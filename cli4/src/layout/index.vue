<template>

  <el-container>
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <el-aside width="200px">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <!-- <el-main>Main</el-main> -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
  <!-- <Sidebar />
    <AppMain /> -->
</template>

<script>
import Sidebar from './component/sidebar/index.vue'
// import AppMain from './component/app-main.vue'

export default {
  name: 'layout',
  components: {
    Sidebar,
    // AppMain,
  },
  data() {
    return {
      layoutData: 'layout.vue'
    };
  },
  methods: {
    /**
     * Vue2中注册在router-link上事件无效解决方法
     * 使用@click.native。原因：router-link会阻止click事件，.native指直接监听一个原生事件
     */
    test() {
      console.log('测试 router-link 上的事件')
    },
  },
};
</script>

<style scoped lang="scss">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
//   line-height: 800px;
// }

// .el-aside {
//   background-color: #d3dce6;
// }

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}

// // 固定在底部
// .el-footer {
//   position: fixed;
//   bottom: 0;
//   right: 0;
//   width: calc(100% - 200px);
// }
// .el-main {
//   padding-bottom: 80px;
// }
</style>
