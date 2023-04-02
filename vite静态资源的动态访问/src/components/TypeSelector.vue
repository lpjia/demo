<template>
  <div class="wrap">
    <ul>
      <li v-for="item, i in imgList" @click="changeImg(i)" :class="{ active: activeIndex === i }">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';

const imgList = reactive(['一', '二', '三'])
const activeIndex = ref(0)
const emit = defineEmits(['change'])

function changeImg(i: number) {
  activeIndex.value = i
  emit('change', i + 1)
}
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
}

.wrap {
  background-color: #3c3939;
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  display: flex;
}

li {
  background-color: #fff;
  padding: 4px 8px;
  border-right: 1px solid #333;

  &:hover {
    cursor: pointer;
  }

  &.active {
    color: #fff;
    background-color: deepskyblue;

    // 给活跃元素加悬浮样式
    &:hover {
      opacity: .9;
    }
  }

  // 给非活跃元素加悬浮样式
  &:hover:not(.active) {
    color: rgba(0, 191, 255, .8);
  }
}
</style>
