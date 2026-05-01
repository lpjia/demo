<script>
export default {
  name: 'NumPingyiDelay',
  data() {
    return {
      animate: false,
      s: 0,
    }
  },
  methods: {
    clk() {
      // 添加延时
      this.s = new Date().getSeconds() % 10;
      this.animate = true
    }
  },
  render(h) {
    // 延时值是 -x秒, 从中间某时刻开始渲染动画
    // 从当前的秒数开始渲染
    return (
      <div id="digit">
        <section id="stripe"
          class={{ animate: this.animate }}
          style={{ transitionDelay: `-${this.s}s` }}
          onclick={this.clk}>0123456789</section>
      </div>
    )
  }
};
</script>

<style scoped lang="scss">
#digit {
  width: 0.5em;
  overflow: hidden;
  font: 32px monospace;
  cursor: pointer;
}
#stripe {
  display: inline-block;
}

#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
  transition-timing-function: linear;
}
</style>
