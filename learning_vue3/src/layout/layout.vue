<template>
  <div class="top">
    <router-link to="/" class="colGap">go to home</router-link>
    <router-link to="/hello" class="colGap">go to hello</router-link>
    <router-link to="/one" class="colGap">go to one</router-link>
    <router-link to="/two" class="colGap">go to two</router-link>
    <router-link to="/three" class="colGap">go to three</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {
  },
  props: {
  },
};
</script>

<style scoped lang="scss">
.top {
  margin: 20px auto;
  .colGap {
    margin: 0 10px;
  }
}
</style>
