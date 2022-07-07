<script>
import StickyExample from './StickyExample.vue';
export default {
  name: 'StickyPosition', // 粘性定位
  components: {
    StickyExample
  },
};
</script>

<template>
  <div>
    <h3>用 iframe</h3>
    <iframe src="/html/sticky.html" class="iframeStyle" />

    <h3>用组件</h3>
    <section class="iframeStyle_2">
      <sticky-example />
    </section>
  </div>
</template>

<style scoped lang="scss">
.iframeStyle,
.iframeStyle_2 {
  width: 100%;
  height: 280px;
  border: 1px solid #000;
  overflow: auto;
}
</style>
