<script>
import AnimateCss from './components/AnimateCss.vue';
import NativeAnimation from './components/native-a/NativeAnimation.vue';
import NumPingyi from './components/native-a/NumPingyi.vue';
import NumPingyiDelay from './components/native-a/NumPingyiDelay.vue';
import TrainYunsu from './components/native-a/TrainYunsu.vue';
import TransitionComp from './components/TransitionComp.vue';
export default {
  name: 'LearningAnimate',
  components: {
    AnimateCss,
    TransitionComp,
    NativeAnimation,
    NumPingyi,
    NumPingyiDelay,
    TrainYunsu,
  },
  props: {
  },
  NativeAnimationta() {
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
  },
};
</script>

<template>
  <div>
    <h3>原生动画</h3>
    <native-animation class="inlineB" />
    <h6 class="inlineB marginLB">无动画效果作为对比</h6>
    <p>----分割线----</p>

    <num-pingyi />
    <p>----分割线----</p>

    <num-pingyi-delay />
    <p>----分割线----</p>

    <train-yunsu cls="yunsu" />
    <p>----分割线----</p>

    <train-yunsu cls="jiansu" />
    <p>----分割线----</p>

    <el-divider></el-divider>

    <h3>animate.css 库</h3>
    <animate-css />
    <el-divider></el-divider>

    <h3>vue 内置组件 transition</h3>
    <transition-comp />
  </div>
</template>

<style scoped lang="scss">
::v-deep {
  h6 {
    font-size: 32px;
  }
  h6:hover {
    color: red;
  }
}
</style>
