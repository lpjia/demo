<script>
export default {
  name: 'FixedCover', // 固定叠加
};
</script>

<template>
  <div class="compRoot">
    <h3>这两个是 fixed</h3>
    <div id="one" class="d">111</div>
    <div id="two" class="d">222</div>
  </div>
</template>
<style scoped lang="scss">
.compRoot {
  width: 60%;
  padding: 10px;
  border: solid 1px #000;
  .d {
    width: 60px;
    height: 60px;
    position: fixed;
  }

  // 覆盖顺序和 z-index 有关, 也和 dom 先后顺序有关
  // 谁大谁上, 后来居上
  // 若无样式覆盖, 则和 class 书写顺序无关
  #one {
    background-color: deepskyblue;
    top: 10px;
    right: 0;
    // z-index: auto;
    z-index: 1;
  }

  #two {
    background-color: deeppink;
    top: 40px;
    right: 26px;
  }
}
</style>
