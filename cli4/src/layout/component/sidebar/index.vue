<template>
  <div>
    <!-- 上面是 logo + 系统名字 -->
    <Logo v-if="showLogo" />

    <!-- 下面是菜单, 带滚动 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu mode="vertical" router :default-active="$route.path">
        <!-- 先弄内容, 再管样式 -->

        <!-- <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->

        <!-- <el-menu-item v-for="route in">

        </el-menu-item> -->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './logo.vue';
import customSetting from '@/configs/setting.js'
// import vars from '@/styles/vars.scss'

export default {
  name: 'Sidebar',
  components: {
    Logo
  },
  data() {
    return {
      // 直接从 setting.js 取数据, 也没存 vuex
      showLogo: customSetting.showSidebarLogo
    };
  },
  mounted() {
    // console.log('this.showLogo:', this.showLogo)

    const msg = this.$route
    console.log('msg:', msg)
  },
};
</script>

<style scoped lang="scss">
</style>
