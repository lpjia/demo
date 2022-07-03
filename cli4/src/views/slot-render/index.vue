<template>
  <div>
    <h3>作用域插槽 商品展示</h3>
    <ChildTwelve />

    <h3>之前写的</h3>
    <ChildEleven />

    <h3>不用插槽</h3>
    <ChildOne />
    <!-- 把原先的 html 封装到组件中, 减少这的代码 -->

    <h3>v-slot 具名插槽</h3>
    <NamedSlot />

    <h3>动态插槽名</h3>
    <DynamicSlot />

    <h3>作用域插槽</h3>
    <ScopeSlot />

    <h3>render 和插槽, render 用普通数组写法</h3>
    <Render />

    <ChildThree />

    <h3>用 render 向子组件中传递作用域插槽</h3>
    <ChildFour />

    <h3>改写官方示例</h3>
    <ChildFive />

    <!-- 原本是 dom 模版通过 <script type="text/x-template" id="test-template"> 引入 -->
    <!-- 现在改为 SFC, 直接写 template -->
    <h3>使用了 functional 函数式组件(BaseLayout.vue)</h3>
    <ChildSix />

    <h3>用 jsx 写, 内容少且简单, 学习 jsx</h3>
    <ChildSeven />

    <h3>用 jsx 写, 多种用法展示</h3>
    <ChildEight />

    <h3>用 jsx 写, 带锚点的标题, 插槽相关用法</h3>
    <ChildNine />

    <h3>用 jsx 写, 插槽相关用法, plus</h3>
    <ChildTen />
  </div>
</template>

<script>
import ChildOne from './component/ChildOne.vue'
import NamedSlot from './component/NamedSlot.vue'
import DynamicSlot from './component/DynamicSlot.vue'
import ScopeSlot from './component/ScopeSlot.vue'
import Render from './component/Render.vue'
import ChildThree from './component/ChildThree.vue'
import ChildFour from './component/ChildFour.vue'
import ChildFive from './component/ChildFive.vue'
import ChildSix from './component/ChildSix.vue'
import ChildSeven from './component/ChildSeven.vue'
import ChildEight from './component/ChildEight.vue'
import ChildNine from './component/child-nine/ChildNine.vue'
import ChildTen from './component/child-ten/ChildTen.vue'
import ChildEleven from './component/child-eleven/ChildEleven.vue'
import ChildTwelve from './component/child-twelve/ChildTwelve.vue'

export default {
  name: 'SlotRender',
  components: {
    ChildOne,
    NamedSlot,
    DynamicSlot,
    ScopeSlot,
    Render,
    ChildThree,
    ChildFour,
    ChildFive,
    ChildSix,
    ChildSeven,
    ChildEight,
    ChildNine,
    ChildTen,
    ChildEleven,
    ChildTwelve,
  },
}
</script>

<style lang="scss" scope>
.el-divider {
  background-color: #000;
}
</style>