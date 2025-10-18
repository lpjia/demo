<script>
export default {
  name: 'ChildYi',
  mounted() {
    // 得手动写一行触发事件, 改了子的代码, 侵入式
    this.$emit('mounted')
  },
  render(h) {
    return (
      <div>
        <p>父组件可以监听子组件的生命周期钩子, 以 mounted 为例, 其他生命周期钩子没测</p>
      </div>
    )
  }
};
</script>
