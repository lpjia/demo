<template>
  <div class="demo">
    <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab">
      {{ tab }}
    </button>

    <Component :is="currentTabComponent" class="tab"></Component>

    <keep-alive v-show="currentTab === 'Posts'">
      <Component :is="currentTabComponent" class="tab"></Component>
    </keep-alive>

    <!-- <Component :is="TabHome" style="margin-top: 10rem;"></Component> -->
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';

/* 注册局部组件, 结合动态组件
:is直接赋值为导入的组件对象

一般全局组件是被注册的组件名 */
import TabHome from "@/components/15-ChildTabHome.vue";
import TabPosts from "./15-ChildTabPosts.vue";
import TabArchive from "./15-ChildTabArchive.vue";

const tabs = ['Home', 'Posts', 'Archive']
const currentTab = ref('home')
const tabComp = {
  home: TabHome,
  posts: TabPosts,
  archive: TabArchive,
}
type TabCompKey = keyof typeof tabComp; // 拿到key的类型
const currentTabComponent = computed(() => {
  return tabComp[currentTab.value.toLowerCase() as TabCompKey] // as类型断言, 为了tabComp类型安全, 拿到对应的key
})
</script>

<style lang="scss">
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}

.tab-button:hover {
  background: #e0e0e0;
}

.tab-button.active {
  background: #e0e0e0;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.dynamic-component-demo-posts-tab {
  display: flex;
}

.dynamic-component-demo-posts-sidebar {
  max-width: 40vw;
  margin: 0;
  padding: 0 10px 0 0;
  list-style-type: none;
  border-right: 1px solid #ccc;
}

.dynamic-component-demo-posts-sidebar li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.dynamic-component-demo-posts-sidebar li:hover {
  background: #eee;
}

.dynamic-component-demo-posts-sidebar li.dynamic-component-demo-active {
  background: lightblue;
}

.dynamic-component-demo-post-container {
  padding-left: 10px;
}

.dynamic-component-demo--post> :first-child {
  margin-top: 0;
  padding-top: 0;
}
</style>
