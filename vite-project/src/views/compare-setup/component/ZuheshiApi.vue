<script>
// <script lang='ts'>
// import { ref } from 'vue'

export default {
  name: 'ZuheshiApi',
  // setup(props, context) { // 可用 ctx
  setup() {
    // 功能一
    const showDiv = ref(true)
    function show() {
      showDiv.value = true
    }
    function hide() {
      showDiv.value = false
    }

    // 功能二
    const fontColor = ref('')
    function changeRed() {
      fontColor.value = 'red'
    }
    function changeYellow() {
      fontColor.value = 'blue'
    }

    return {
      showDiv,
      show,
      hide,

      fontColor,
      changeRed,
      changeYellow,
    }
  },
}
</script>

<template>
  <div>
    <!-- 功能一模板 -->
    <div>
      <button @click="hide">隐藏</button>
      <button @click="show">显示</button>
    </div>
    <div class="box" v-if="showDiv">一个被控制显隐的div</div>
  </div>
  <hr>
  <div>
    <!-- 功能二模板 -->
    <div>
      <button @click="changeRed">红色</button>
      <button @click="changeYellow">蓝色</button>
    </div>
    <div class="box" :style="`color:${fontColor}`">一个被控制字体颜色的的div</div>
  </div>
  <hr>
</template>

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