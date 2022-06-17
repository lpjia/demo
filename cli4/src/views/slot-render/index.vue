<template>
  <div>
    <h3>不用插槽</h3>
    <ChildOne />
    <!-- 把原先的 html 封装到组件中, 减少这的代码 -->

    <h3>v-slot 具名插槽</h3>
    <NamedSlot />

    <h3>动态插槽名</h3>
    <DynamicSlot />

    <h3>作用域插槽</h3>
    <ScopeSlot />

    <h3>render 和插槽</h3>
    <Render />

    <ChildThree />

    <h3>用 render 向子组件中传递作用域插槽</h3>
    <ChildFour />

    <h3>改写官方示例</h3>
    <ChildFive />

    <!-- 原本是 dom 模版通过 <script type="text/x-template" id="test-template"> 引入 -->
    <!-- 现在改为 SFC, 直接写 template -->
    <h3>使用了 functional 函数式组件</h3>
    <ChildSix />

    <h3>用 jsx 写, 内容少且简单, 学习 jsx</h3>
    <ChildSeven />
  </div>
</template>

<script>
// import Computed from './component/computed.vue'
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
  },
}
</script>

<style lang="sass">
.el-divider
  background-color: #000
</style>