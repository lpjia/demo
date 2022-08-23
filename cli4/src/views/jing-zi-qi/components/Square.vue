<script>
export default {
  name: 'Square', // 方格
  functional: true,
  render(h, ctx) {
    // console.log(ctx.props)

    // return (
    //   <button
    //     class="square"
    //     onClick={() => ctx.props.onClick()}
    //   >
    //     {ctx.props.value}
    //   </button>
    // )

    return (
      <button
        class="square"
        onClick={() => ctx.props.onClick()}
      >
        {'X'}
      </button>
    )
  }
};
</script>

<style scoped lang="scss">
.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}
.square:focus {
  outline: none;
}
</style>