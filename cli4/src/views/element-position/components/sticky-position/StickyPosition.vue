<script>
import ImgDuidie from './ImgDuidie.vue';
import StickyExample from './StickyExample.vue';
export default {
  name: 'StickyPosition', // 粘性定位
  components: {
    StickyExample,
    ImgDuidie,
  },
  data() {
    return {
      imgArr: [
        { path: 'imgs/sticky/10-480x360.jpg' },
        { path: 'imgs/sticky/11-480x360.jpg' },
        { path: 'imgs/sticky/12-480x360.jpg' },
        { path: 'imgs/sticky/13-480x360.jpg' },
        { path: 'imgs/sticky/14-480x360.jpg' },

        // { path: '10-480x360' },
        // { path: '11-480x360' },
        // { path: '12-480x360' },
        // { path: '13-480x360' },
        // { path: '14-480x360' },
      ]
    }
  },
};
</script>

<template>
  <div>
    <h3>粘性布局</h3>
    <h3>用 iframe</h3>
    <iframe src="/html/sticky.html" class="iframeStyle" />

    <h3>用组件</h3>
    <StickyExample class="iframeStyle_2" />

    <h3>图片堆叠</h3>
    <ImgDuidie :imgArr="imgArr" />
  </div>
</template>

<style scoped lang="scss">
.iframeStyle,
.iframeStyle_2 {
  width: 60%;
  height: 280px;
  border: 1px solid #000;
  overflow: auto;
}
</style>
