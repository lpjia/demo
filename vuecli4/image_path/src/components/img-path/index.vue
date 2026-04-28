<template>
  <div style="width:60%; margin: 0 auto;">
    <h3>使用绝对路径, 找的是 public 目录</h3>
    <p>{{ jue_dui_path }}</p>
    <img :src="jue_dui_path" class="logo" />

    <h3>jsx 写法</h3>
    <RenderJsx :imgs="imgArr" />
  </div>
</template>

<script>
import RenderJsx from './RenderJsx.vue';
export default {
  name: 'ImgPath',
  components: {
    RenderJsx
  },
  props: {
  },
  data() {
    return {
      jue_dui_path: '/pub_logo.png',
      imgs: [
        { path: '@/assets/imgs/sticky/10-480x360.jpg' },
        { path: '@/assets/imgs/sticky/11-480x360.jpg' },
        { path: '@/assets/imgs/sticky/12-480x360.jpg' },
        { path: '@/assets/imgs/sticky/13-480x360.jpg' },
        { path: '@/assets/imgs/sticky/14-480x360.jpg' },
      ],
    };
  },
  computed: {
    imgArr() {
      const result = []

      this.imgs.forEach(item => {
        result.push({ path: item.path.substring(9) })
        /* { path: 'imgs/sticky/10-480x360.jpg' } */
      })
      
      return result
    }
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

<style scoped lang="scss">
.logo {
  width: 100px;
}
::v-deep {
  .compRoot {
    height: 400px;
    overflow: auto;
  }
  section {
    position: sticky;
    top: 0;
  }
  li {
    margin-bottom: 6px;
  }
}
</style>
