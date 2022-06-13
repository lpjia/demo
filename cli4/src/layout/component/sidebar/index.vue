<template>
  <div>
    <!-- 上面是 logo + 系统名字 -->
    <Logo v-if="showLogo" />
    <!-- 下面是菜单, 带滚动 -->
  </div>
</template>

<script>
import Logo from './logo.vue';

import customSetting from '@/configs/setting.js'

import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    Logo
  },
  props: {

  },
  data() {
    return {
      // 直接从 setting.js 取数据, 无响应式, 也没存 vuex
      showLogo: customSetting.showSidebarLogo
    };
  },
  computed: {
    /**
     * 想把设置里的数据拿过来放到 getters
     */
    ...mapGetters(['sidebarLogoColor'])
    // ...mapGetters({
    //   'showSidebarLogo': 'app/showSidebarLogo'
    // })
    // showLogo() {
    //   return this.$store.app.showSidebarLogo
    // }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      console.log(this.showLogo)

      // console.log(this.sidebarLogoColor)      
      const a = this.$store.getters['app/sidebarLogoColor']
      console.log('a:', a)
    }, 1000);
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
</style>
