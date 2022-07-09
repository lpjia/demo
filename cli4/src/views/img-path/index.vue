<script>
import RenderComp from './components/RenderComp.vue';
import RenderJsx from './components/RenderJsx.vue';
import TemplateComp from './components/TemplateComp.vue';
export default {
  name: 'ImgPath',
  components: {
    TemplateComp,
    RenderComp,
    RenderJsx
  },
  props: {
  },
  data() {
    return {
      imgArr: [
        // // 计算属性 imgArr_2 就是这种数据结构
        // { path: 'imgs/sticky/10-480x360.jpg' },
        // { path: 'imgs/sticky/11-480x360.jpg' },
        // { path: 'imgs/sticky/12-480x360.jpg' },
        // { path: 'imgs/sticky/13-480x360.jpg' },
        // { path: 'imgs/sticky/14-480x360.jpg' },

        { path: '@/assets/imgs/sticky/10-480x360.jpg' },
        { path: '@/assets/imgs/sticky/11-480x360.jpg' },
        { path: '@/assets/imgs/sticky/12-480x360.jpg' },
        { path: '@/assets/imgs/sticky/13-480x360.jpg' },
        { path: '@/assets/imgs/sticky/14-480x360.jpg' },

        // { path: '10-480x360' },
        // { path: '11-480x360' },
        // { path: '12-480x360' },
        // { path: '13-480x360' },
        // { path: '14-480x360' },
      ],

      jueduiPath: '/logo.png',
    };
  },
  computed: {
    imgArr_2() {
      let result = []

      this.imgArr.map(item => {
        return result.push({ path: item.path.substring(9) })
        // 这里可以不用索引, 毕竟文件路径一般以目录名来定基准
        // 有时间可以换写法
      })
      return result
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
    // console.log(this.imgArr_2)
  },
  methods: {
  },
};
</script>

<template>
  <div style="width:60%;">
    <h3>使用绝对路径, 找的是 public 目录</h3>
    <p>{{ jueduiPath }}</p>
    <img :src="jueduiPath" />

    <h3>模版写法</h3>
    <template-comp :arr="imgArr_2" />
    <el-divider></el-divider>

    <h3>render() 写法</h3>
    <render-comp :arr="imgArr_2" />
    <el-divider></el-divider>

    <h3>jsx 写法</h3>
    <render-jsx :arr="imgArr_2" />
  </div>
</template>

<style scoped lang="scss">
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
