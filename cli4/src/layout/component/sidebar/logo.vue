<template>
  <!-- <div class="sidebar-logo-container">
    <img v-if="logo" :src="logo" class="sidebar-logo">
  </div> -->

  <div class="sidebar-logo-container">
    <router-link key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <h1 class="sidebar-title" :style="{ color:logoTxtColor }">{{ title }}</h1>
      <!-- <h1 class="sidebar-title" :style="{color:logoTxtColor()}" :title="title_2(title)">{{ title }}</h1> -->
    </router-link>
  </div>

</template>

<script>
import customSetting from '@/configs/setting.js'
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarLogo',
  data() {
    return {
      logo: customSetting.sidebarLogoUrl,
      title: 'lpjia-admin'
    };
  },
  computed: {
    ...mapGetters(['logoTxtColor'])

    // ...mapGetters({
    //   logoTxtColor: 'app/sidebarLogoTxtColor'
    // }),

    // logoTxtColor() {
    //   return this.$store.getters['app/sidebarLogoTxtColor']
    // },
    // title_2() {
    //   return txt => txt + this.logoTxtColor
    // },

    // logoTxtColor() {
    //   return () => this.$store.getters['app/sidebarLogoTxtColor']
    // },
    // title_2() {
    //   return txt => txt + this.logoTxtColor()
    // },
  },
  mounted() {
    // const logoTxtColor = this.$store.getters['app/sidebarLogoTxtColor']
    // console.log('logoTxtColor:', logoTxtColor)
  },
};
</script>

<style scoped lang="scss">
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      // color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
