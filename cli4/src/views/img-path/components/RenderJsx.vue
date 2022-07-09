<script>
export default {
  name: 'RenderJsx',
  functional: true,
  render(h, ctx) {
    // 直接用变量路径不行 <img src={require(item.path)} />
    // 只有前面路径可行 <img src={require('@/assets/' + item.path)} />
    // 前面路径最短是 <img src={require('@/assets' + item.path)} />
    // 不用变量, 全用路径 <img src={require('@/assets/imgs/sticky/12-480x360.jpg')} />
    // 只用变量存图片名 <img src={require(`@/assets/imgs/sticky/${item.path}.jpg`)} />
    return (
      <div class="compRoot">
        {ctx.props.arr.map(item => {
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