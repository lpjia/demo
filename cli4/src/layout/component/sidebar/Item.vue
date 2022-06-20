<script>
export default {
  name: 'MenuItem',
  functional: true,
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

    // 先把上面实现, 再尝试下面 jsx
    // return (
    //   // { icon?icon.includes('el-icon') ?<i class={[icon, 'sub-el-icon']}:<>:''}      
    //       )
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
