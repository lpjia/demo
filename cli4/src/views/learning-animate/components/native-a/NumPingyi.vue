<script>
export default {
  name: 'NumPingyi',
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
        <section id="stripe" class={{ animate: this.animate }}
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
  // transition-property: transform;
  // transition-duration: 9s;
  // transition-timing-function: linear; // 线性
  transition: transform 9s linear;
}
</style>
