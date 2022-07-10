<script>
export default {
  name: 'Airplane',
  data() {
    return {
      animate: false,
      isEnd: false
    }
  },
  methods: {
    clk() {
      this.animate = true
      const el = document.querySelector('#flyjet')
      el.addEventListener("transitionend", this.log, false)
    },
    log() {
      // transitionend 会被触发两次 —— 每个属性触发一次
      if (!this.isEnd) {
        this.isEnd = true
        console.log('Done!')
      }
    }
  },
  render(h) {
    return <img id="flyjet"
      src="https://en.js.cx/clipart/flyjet.jpg"
      class={{ growing: this.animate }}
      onclick={this.clk}
    />
  }
};
</script>

<style scoped lang="scss">
$addStyle: cubic-bezier(0.25, 1.5, 0.75, 1.5);

#flyjet {
  width: 40px;
  height: 24px;
  // transition: all 3s;
  transition: all 3s $addStyle;
}
#flyjet.growing {
  width: 400px;
  height: 240px;
}
</style>
