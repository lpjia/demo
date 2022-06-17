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

        <!-- <el-menu-item v-for="route in permission_routes" :key="route.path" :index="route.path" route> -->
        <el-menu-item v-for="route in permission_routes" :key="route.path" :index="route.path">
          <template v-if="route.hidden">
            <i class="el-icon-goods"></i>
            <span slot="title">{{ route.name }}</span>

          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      showLogo: customSetting.showSidebarLogo,

    };
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  mounted() {
    this.$store.dispatch('permission/generateRoutes_2', null)
    // console.log('this.showLogo:', this.showLogo)

    console.log('this.$route:', this.$route)

    // console.log('this.$router:', this.$router)

    console.log('this.permission_routes:', this.permission_routes)

    // const req = require.context('./svg', false, /\.svg$/)
    // const req = require.context('@/icons/svg', false, /\.svg$/)
    // console.log('req:', req)
  },
};
</script>

<style scoped lang="scss">
</style>
