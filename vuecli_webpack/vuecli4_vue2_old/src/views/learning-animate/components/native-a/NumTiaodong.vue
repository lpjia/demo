<script>
export default {
  name: 'NumTiaodong',
  props: {
    cls: String
  },
  data() {
    return {
      animate: false
    }
  },
  methods: {
    clk() {
      this.animate = true
    }
  },
  render(h) {
    return (
      <div id="digit">
        <section id="stripe"
          class={{ animate: this.animate }}
          style={{ "--fx": this.cls }}
          onclick={this.clk}>0123456789</section>
      </div>
    )
  }
};
</script>

<style scoped lang="scss">
// 这里用新的 css 变量语法来实现 js 变量传递到 scss
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
  // transition: transform 9s steps(9, start); //
  transition: transform 9s steps(9, var(--fx));
}
</style>
