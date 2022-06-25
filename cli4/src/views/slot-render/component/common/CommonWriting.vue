<script>
export default {
  name: 'CommonWriting',
  // 在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。
  // 只有在函数式组件的情况下, 可以不写
  // props: {},
  functional: true,
  render(h, context) {
    const { msg, isOnly } = context.props
    const vnodes = []

    // 这里没有 template 的根节点限制, 如果是 jsx, 有限制
    if (isOnly) vnodes.push(<div style="margin-top:20px;"><i>{msg}</i></div>)
    if (isOnly) vnodes.push(<div style="margin-top:20px;"><i>{msg}</i></div>)
    return vnodes
  }
};
</script>
