<template>
  <div>
    <button v-for="tab in tabs" v-bind:key="tab" v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-on:click="currentTab = tab">
      {{ tab }}
    </button>

    <keep-alive>
      <component v-bind:is="currentTabComponent" class="tab"></component>
    </keep-alive>

    <div class="up_down">
      <component :is="currLocalComp" :prop_count="100"></component>
    </div>
    <!-- 渲染动态组件, 效果类似于下面两个, 可以传入自定义属性 -->
    <!-- <button-counter :prop_count="100"></button-counter> -->
    <!-- <button-counter-minus :prop_count="100"></button-counter-minus> -->

    <div class="up_down">
      缓存动态组件, 不被销毁
      <keep-alive>
        <component :is="currLocalComp" :prop_count="100"></component>
      </keep-alive>
    </div>

    <div class="up_down">
      缓存部分动态组件, 不被销毁
      <!-- 这里不能用组件名去正则匹配, 因为都能匹配上, 加个 name 来区分吧 -->
      <!-- <keep-alive :include="/button-counter/"> -->

      <!-- 根据 name 来区分 -->
      <!-- <keep-alive :include="/add/"> -->

      <!-- 数组 -->
      <!-- <keep-alive :include="['button-counter']"> -->

      <!-- 字符串, 不用绑定, 多个以逗号隔开 -->
      <keep-alive include="button-counter">
        <component :is="currLocalComp" :prop_count="100"></component>
      </keep-alive>
    </div>

    <div class="up_down">
      不缓存部分动态组件
      <keep-alive exclude="button-counter,button-counter-minus">
        <component :is="currLocalComp" :prop_count="100"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ButtonCounter from './components/ButtonCounter.vue'
import TabArchive from './components/TabArchive'
import TabPosts from './components/TabPosts'
import ButtonCounterMinus from './components/ButtonCounterMinus'

export default {
  name: 'DynamicComp',
  components: {
    ButtonCounterMinus,
    'button-counter': ButtonCounter,
    'tab-archive': TabArchive,
    'tab-posts': TabPosts,
  },
  props: {

  },
  data() {
    return {
      currentTab: "Posts",
      tabs: ["Posts", "Archive"],

      localCompArr: ['', '-minus'],
      currlocal: 'button-counter',
    };
  },
  computed: {
    currentTabComponent: function () {
      return "tab-" + this.currentTab.toLowerCase();
    },

    currLocalComp() {
      return `button-counter${this.localCompArr[this.tabs.findIndex(curr => curr === this.currentTab)]}`
    },
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
  },
};
</script>

<style lang="scss">
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
}

.posts-tab {
  display: flex;
}

.posts-sidebar {
  max-width: 40vw;
  margin: 0;
  padding: 0 10px 0 0;
  list-style-type: none;
  border-right: 1px solid #ccc;
}

.posts-sidebar li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.posts-sidebar li:hover {
  background: #eee;
}

.posts-sidebar li.selected {
  background: lightblue;
}

.selected-post-container {
  padding-left: 10px;
}

.selected-post > :first-child {
  margin-top: 0;
  padding-top: 0;
}
</style>
