<script>
export default {
  name: 'MenuItem',
  functional: true,
  // 只有在函数式组件的情况下, 可以不写
  // 在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。
  // props: {
  //   icon: {
  //     type: String,
  //     default: ''
  //   },
  //   title: {
  //     type: String,
  //     default: ''
  //   }
  // },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    // 一级菜单一般加 icon, 二级子菜单就不加了
    if (icon) {
      /**
       * 判断是否包含 element 自带的 icon, el-icon-xxx
       * https://element.eleme.cn/#/zh-CN/component/icon
       * https://panjiachen.gitee.io/vue-element-admin-site/zh/feature/component/svg-icon.html
       * https://juejin.cn/post/6844903517564436493
       * 这几个链接都要看
       */
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        /**
         * <svg-icon icon-class="password"  class-name='custom-class' />
         * icon-class 为 icon 的名字; class-name 为 icon 自定义 class
         */
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes

    // 用 jsx 实现, 感觉没有上面的简单
    // return (
    //   <span>
    //     {icon ? icon.includes('el-icon') ?
    //       <i class={[icon, 'sub-el-icon']} /> :
    //       // <i class="sub-el-icon" class={icon} /> : // 方便理解, 可以拆开写
    //       <svg-icon icon-class={icon} /> :
    //       ''}
    //     {title ? <span slot='title'>{title}</span> : ''}
    //   </span>
    // )

  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
