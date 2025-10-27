<script>
export default {
  // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  activated() {
    console.log('TabArchive 组件被激活了')
  },
  deactivated() {
    console.log('TabArchive 组件被停用了')
  },
  render(h) {
    return <div>Archive component</div>
  }
}
</script>