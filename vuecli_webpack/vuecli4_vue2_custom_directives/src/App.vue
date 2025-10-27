<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <hr />
    <!-- <p v-color="color">调试v-color自定义指令</p>
    <button @click="color = 'blue'">改变颜色</button> -->
    <!-- <ul v-for="n in list" :index="n">
      <li v-color="color">{{ n }}</li>
    </ul>
    <button @click="loadData">添加项</button> -->
    <!-- <hr /> -->
    <!-- <p v-myshow="isShow" style="display: inline">调试v-myshow自定义指令</p>
    <p v-my-plugin-show="isShow" style="display: inline">
      调试v-my-plugin-show自定义指令
    </p>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <hr /> -->
    <!-- <input type="text" v-focus />
    <hr /> -->

    <!-- 这个表达式会报错 -->
    <!-- <button v-clk:can_shu.xiu_shi_fu.xiu2="随便字符串">执行方法</button> -->

    <!-- 字符串 -->
    <!-- <button v-clk:can_shu.xiu_shi_fu.xiu2="'随便字符串'">执行方法</button> -->

    <!-- 表达式 -->
    <!-- <button v-clk:can_shu.xiu_shi_fu.xiu2="1 + 1">执行方法</button> -->

    <!-- data和method、computed都可以 -->
    <!-- <button v-clk:can_shu.xiu_shi_fu.xiu2="num" @click="log">执行方法</button> -->

    <p v-pin:[direction].fixed="60">动态参数</p>

    <MyPluginComp v-loading="!isShow" />
    <button @click="isShow = !isShow">显示/隐藏</button>
  </div>
</template>

<script>
import Vue from "vue";
import clk from "@/directives/clk";
import pin from "@/directives/pin";
import loading from "@/directives/loading";

export default {
  name: "App",
  components: {},
  data() {
    return {
      color: "red",
      list: [],
      isShow: false,
      direction: "top",
    };
  },
  computed: {
    num() {
      return this.list.length;
    },
  },
  // 注册局部自定义指令
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
    clk: clk,
    pin: pin,
    // bind和update钩子函数共用
    loading: function (el, binding) {
      loading(el, binding);
    },
  },
  created() {
    Vue.myGlobalMethod();

    this.$myMethod();
  },
  methods: {
    loadData() {
      this.list = [1, 10];
    },
    log() {
      console.log("执行log");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
