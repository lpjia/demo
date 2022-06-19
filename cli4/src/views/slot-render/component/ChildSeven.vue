<script>
import BaseLayout from './BaseLayout.vue'

export default {
  name: 'ChildSeven',
  // 加上后, 插槽 header 和 footer 都渲染不出来了
  functional: true,
  render(h) {
    return (
      <BaseLayout>
        <template slot="header">
          <h3>Here might be a page title 这可能是一个页面标题</h3>
        </template>
        <p>A paragraph for the main content. 一段主要内容</p>
        <p>And another one. 还有一个</p>
        <p>template 里没有指明具名插槽的, 按默认插槽处理, 这三行都是直接填坑到默认插槽</p>
        <template slot="footer">
          <p>Here's some contact info 这是一些联系信息</p>
        </template>
      </BaseLayout>
    )
  }
};
</script>