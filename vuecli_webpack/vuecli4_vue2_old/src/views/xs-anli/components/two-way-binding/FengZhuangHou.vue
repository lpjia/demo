<script>
import msgboxSlider from './msgboxSlider'

export default {
  name: 'FengZhuangHou',
  data() {
    return {
      num: 88
    };
  },
  methods: {
    clk() {
      msgboxSlider(this, {
        slider: {
          value: this.num
        },
        /* 模拟网络请求 */
        // beforeClose: (action, done) => {
        //   this.$loading()
        //   setTimeout(() => {
        //     done()
        //     this.$loading().close()
        //   }, 1000)
        // }

        /* 另一种实时变化, 双向绑定 */
        onInput: val => {
          this.num = val
        }
        // 也不需要后面的 .then()
      })
      // .then(val => {
      //   this.num = val
      // })
    },
  },
};
</script>

<template>
  <div>
    <span @click="clk">{{ num }}</span>
  </div>
</template>