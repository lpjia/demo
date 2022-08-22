<script>
import Vue from 'vue'
import SonToFather from './SonToFather.vue'
import FengZhuangHou from './FengZhuangHou.vue';

export default {
  name: 'TwoWayBinding',
  components: {
    SonToFather,
    FengZhuangHou,
  },
  data() {
    return {
      num: 20,
      // idx: 1,
    };
  },
  methods: {
    clk() {
      const h = this.$createElement;
      this.idx++

      const that = this
      const ctt = h('el-slider',
        {
          props: {
            value: this.num
          },
          // 普通属性
          attrs: {
            'show-input': true
          },
          on: {
            /* 这要注意 this 指向问题 */
            input: val => {
              const flagBackup = Vue.config.silent
              Vue.config.silent = true
              ctt.componentInstance.value = val
              Vue.config.silent = flagBackup
              this.num = val
            },
            /* input(val) { // 这里 this 指向了 null
              that.num = val
            } */
          },
        },
        // {
        //   key: this.idx
        // }
      )
      this.$msgbox({
        title: '消息',
        message: ctt,
        showConfirmButton: false,
        showCancelButton: false,
        beforeClose: (action, instance, done) => {
          done()
        }
      })
        .then(action => { })
        .catch(err => { })
    },
  },
};
</script>

<template>
  <div>
    <span @click="clk">{{ num }}</span>
    <button @click="num++" class="marginLB">+1</button>

    <!-- 子与父 双向绑定成功 -->
    <SonToFather :num.sync="num" />
    <p>----分割线----</p>

    <!-- 用现成封装好的 -->
    <FengZhuangHou />
  </div>
</template>