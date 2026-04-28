<script>
export default {
  name: 'RenderJsx',
  functional: true,
  render(h, ctx) {
    return (
      <div class="compRoot">
        {ctx.props.imgs.map(item => {
          return (
            <section>
              <img src={require('@/assets/' + item.path)} />
            </section>
          )
        })}
      </div>
    )
  }
};
</script>