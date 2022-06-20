<template>
  <div>
    <!-- 上面是 logo + 系统名字 -->
    <Logo v-if="showLogo" />

    <!-- 下面是菜单, 带滚动 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu mode="vertical" router :default-active="$route.path" :unique-opened="false">
        <!-- 先弄内容, 再管样式 -->
        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import customSetting from '@/configs/setting.js'
// import vars from '@/styles/vars.scss'
import Logo from './logo.vue';
import SidebarItem from './SidebarItem.vue'



export default {
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem,
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

    // console.log('this.$route:', this.$route)

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
