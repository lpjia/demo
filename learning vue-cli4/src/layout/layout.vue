<template>
  <div class="top">
    <router-link to="/" class="colGap">go to home</router-link>
    <router-link to="/one" class="colGap">go to one</router-link>
    <router-link to="/two" class="colGap">go to two</router-link>
    <router-link to="/three" class="colGap" @click.native="test">goods</router-link>
    <router-link to="/gmap" class="colGap">go to gmap</router-link>
    <router-link to="/four" class="colGap">go to four</router-link>
    <router-view style="margin-top:20px;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
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
.top {
  margin: 20px auto;
  .colGap {
    margin: 0 10px;
  }
  text-align: center;
}
</style>
