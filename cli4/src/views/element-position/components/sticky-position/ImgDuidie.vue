<script>
export default {
  name: 'ImgDuidie',
  functional: true,
  render(h, ctx) {
    return (
      <div class="compRoot">
        {ctx.props.imgArr.map(item => {
          return (
            <section>
              <li>{item.path}</li>
              <img src={require('@/assets/' + item.path)} />
            </section>
          )
        })}
      </div>
    )
  }
};
</script>

<style scoped lang="scss">
.compRoot {
  height: 400px;
  overflow: auto;
}
section {
  position: sticky;
  top: 0;
}
li {
  margin-bottom: 6px;
}
</style>
