<template>
  <div class="home_container">
    <div class="wrap">
      <div class="home_header">头部</div>
      <div class="home_menu">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
          text-color="#fff" unique-opened router>
          <!-- v-for v-if 想用在一起, 那么同一标签上, v-if 获取不到 v-for 的作用域,
          推荐v-for用在template标签上, 子元素用v-if -->
          <template v-for="menu in menusComputed" :key="menu.id">
            <!-- 有子级 -->
            <el-sub-menu :index="String(menu.id)" v-if="menu.children.length">
              <template #title>
                <span>{{ menu.title }}</span>
              </template>
              <!-- 子级不能嵌套在template标签下(有#default则可以), <template><el-menu-item>比如 无法显示子级菜单</el-menu-item></template> -->
              <el-menu-item :index="submenu.path" v-for="submenu in menu.children" :key="submenu.id">{{
                submenu.title }}</el-menu-item>
            </el-sub-menu>
            <!-- 没有子级 -->
            <el-menu-item v-else :index="String(menu.id)">{{ menu.title }}</el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="home_content">右侧内容
        <button @click="add">btn</button>
        <ul>
          <!-- <li v-for="item, i in arr" :key="i">{{ item.name }}</li> -->
        </ul>
        <!-- <button @click="">changeArr</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from "pinia";
import { useUserStore } from '@/stores/user';

// import { onMounted, watch } from 'vue';
// import { useRoute } from 'vue-router';

// import { toRefs } from 'vue';

// const route = useRoute()

const userStore = useUserStore()
const { menusComputed } = storeToRefs(userStore)

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
