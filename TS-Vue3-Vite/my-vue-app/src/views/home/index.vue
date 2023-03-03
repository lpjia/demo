<template>
  <div class="home_container">
    <div class="wrap">
      <div class="home_header">头部</div>
      <div class="home_menu">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
          text-color="#fff">
          <el-sub-menu index="1">
            <template #title>
              <span>Navigator One</span>
            </template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
            <el-menu-item index="1-4-1">item one</el-menu-item>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="home_content">右侧内容
        <button @click="add">add</button>
        <ul>
          <!-- <li v-for="item, i in arr" :key="i">{{ item.name }}</li> -->
        </ul>
        <!-- <button @click="">changeArr</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
// import { onMounted, watch } from 'vue';
// import { useRoute } from 'vue-router';

// import { useUserStore } from '@/stores/user';
import { toRefs } from 'vue';

// const route = useRoute()




// onMounted(() => {
//   const id = route.params.id
//   console.log('id:', id)
//   console.log('route.params:', route.params)
// })

// watch(() => route.params, (val, oldVal) => {
//   console.log(val, oldVal)
//   console.log('加载新数据...')
// })

// const userStore = useUserStore()
// const { token, hehe, count: haha, arr } = toRefs(userStore)
const add = () => {
  // userStore.count++

  // arr.value.pop()
  // userStore.changeArr()
  // changeArr()
}

</script>

<style scoped lang="scss">
.home_container {
  height: 100%;
  position: relative;

  .home_header {
    height: 70px;
    background-color: antiquewhite;
  }

  .home_menu {
    width: 220px;
    // height: calc(100vh - 70px);
    background-color: rgb(77, 186, 175);
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
  }

  .home_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 220px;
    bottom: 0;
    background-color: deepskyblue;
  }
}
</style>
