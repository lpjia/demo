<script>
export default {
  name: 'NativeAnimation',
  render(h) {
    return h('h6',
      ':hover 改变字体'
    )
  }
};
</script>

<style scoped lang="scss">
h6 {
  color: #000;
  transition: color 1s;
}
</style>
