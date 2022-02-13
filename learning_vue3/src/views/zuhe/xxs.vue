<template>
  <h4>xxs.vue</h4>
  <div>
    <!-- 功能一模板 -->
    <button @click="show">显示</button>
    <button @click="hide">隐藏</button>
    <div class="box" v-if="showDiv">一个被控制显隐的div</div>
  </div>
  <hr>
  <div>
    <!-- 功能二模板 -->
    <button @click="changeRed">红色</button>
    <button @click="changeYellow">蓝色</button>
    <div class="box" :style="`color:${fontColor}`">一个被控制字体颜色的的div</div>
  </div>
  <hr>
</template>

<script>
export default {
  name: 'xxs',
  data() {
    return {
      showDiv: true, // 功能一数据
      fontColor: '' // 功能二数据
    }
  },
  methods: {
    // 功能一方法
    show() {
      this.showDiv = true
    },
    hide() {
      this.showDiv = false
    },
    // 功能二方法
    changeRed() {
      this.fontColor = 'red'
    },
    changeYellow() {
      this.fontColor = 'blue'
    }
  }
}
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  line-height: 200px;
  background-color: cornflowerblue;
  text-align: center;
  display: inline-block;
}
</style>
