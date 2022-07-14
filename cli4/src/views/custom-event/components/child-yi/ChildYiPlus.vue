<script>
export default {
  name: 'ChildYiPlus',
  mounted() {
    // 可以
    console.log('子组件触发 mounted 钩子...');
  },
  render(h) {
    return (
      <div>
        <b>占位, 没啥可写的</b>
      </div>
    )
  }
};
</script>
