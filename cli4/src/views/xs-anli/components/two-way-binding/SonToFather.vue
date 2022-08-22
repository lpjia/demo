<script>
export default {
  name: 'SonToFather',
  props: {
    num: Number
  },
  data() {
    return {
      val: 0
    };
  },
  methods: {
    // .sync 需要配合一个事件和方法来触发, 这绑定的 input 事件
    // input 事件, 数据改变时触发（使用鼠标拖曳时，活动过程实时触发）, 改变后的值
    fangfa(val) {
      this.$emit('update:num', val)
    }
  },
};
</script>

<template>
  <div>
    <!-- 子改父 -->
    <el-slider :value="num" @input="fangfa" show-input></el-slider>
    <!-- 用 v-model 会报错 -->
    <!-- <el-slider v-model="num" @input="fangfa" show-input></el-slider> -->
  </div>
</template>