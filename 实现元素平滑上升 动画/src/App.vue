<template>
  <div class="container">
    <div v-for="i in 20" :key="i" :style="{ backgroundColor: randomColor() }" v-slide-in>{{ i }}</div>
  </div>
</template>

<script setup>
function randomColor() {
  // Number.prototype.toString()可以把数字转为字符串, 参是x进制
  let str = Math.random().toString(16).substring(2, 8) // 有可能位数不够
  // 学会使用 while 循环, 很方便
  while (str.length < 6) {
    str += '0'
  }

  return '#' + str
}

</script>

<style>
* {
  box-sizing: border-box;
  border: 0;
  margin: 0;
}

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
}

.container {
  margin: 0 auto;
  width: 80%;
}

.container>div {
  margin: 60px auto;
  width: 80%;
  height: 300px;
  line-height: 300px;
  text-align: center;
  font-size: 4rem;
  color: #fff;
}
</style>
