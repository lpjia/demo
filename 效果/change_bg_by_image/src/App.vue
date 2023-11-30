<template>
  <div class="grid">
    <div class="item" v-for="(url, i) in images">
      <img crossorigin="anonymous" @mouseenter="handleMouseEnter($event.target, i)" @mouseleave="handleMouseLeave"
        :src="url" alt="" :style="{ opacity: hoverIndex === -1 ? 1 : i === hoverIndex ? 1 : 0.2 }">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ColorThief from 'colorthief';

const colorThief = new ColorThief()
const images = []
for (let i = 0; i < 4; i++) {
  images.push(`https://picsum.photos/800/800?r=${i}`)
}
const hoverIndex = ref(-1)
const html = document.documentElement
async function handleMouseEnter(img, i) {
  hoverIndex.value = i
  // 得到这张图片的调色盘(前三种主要颜色)
  /* getPalette是得到多种颜色
  getColor是得到一种颜色 */
  const colors = await colorThief.getPalette(img, 3)
  const [c1, c2, c3] = colors.map(c => `rgb(${c[0]}, ${c[1]}, ${c[2]})`)
  html.style.setProperty('--c1', c1)
  html.style.setProperty('--c2', c2)
  html.style.setProperty('--c3', c3)
}
function handleMouseLeave() {
  hoverIndex.value = -1
  html.style.setProperty('--c1', '#fff')
  html.style.setProperty('--c2', '#fff')
  html.style.setProperty('--c3', '#fff')
}
</script>

<style scoped lang="scss">
.grid {
  width: 80%;
  height: 80vh;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 50px;

  .item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    border-radius: 5px;
    border: 0px solid #fff;

    // 我加的
    &:hover {
      border-width: 1px;
      transform: scale(1.1);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;

      &:hover {
        filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
        border-width: 5px;
        // transform: scale(1.1); // 原有
      }
    }
  }


}
</style>
