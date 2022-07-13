<script>
import Father from './components/Father.vue';
import FatherBrother from './components/FatherBrother.vue';
import Grandpa from './components/Grandpa.vue';

export default {
  name: 'CompCommunication', // 组件通信
  components: {
    Father,
    FatherBrother,
    Grandpa,
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getGrandson(data) {
      console.log("getGrandson:",
        data
      )
    },
  },
};
</script>

<template>
  <div>
    <h3>父子组件通信</h3>
    <p>(props 和 $emit 触发自定义事件)</p>
    <Father />
    <el-divider></el-divider>

    <h3>兄弟组件通信</h3>
    <p>(事件总线 $bus, $on 接收, $emit 发送) 适用于父子、隔代、兄弟组件通信</p>
    <FatherBrother />
    <el-divider></el-divider>

    <h3>隔代组件通信</h3>
    <p>($attrs 和 $listeners 调用自定义事件) 展示的嵌套4级组件之间通信</p>
    <p>(provide 和 inject)</p>
    <Grandpa :dataNum="1000" compDepthLevel="level-0" @getGrandson="getGrandson" />
  </div>
</template>

<style scoped lang="scss">
</style>
