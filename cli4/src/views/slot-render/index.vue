<template>
  <div>
    <h3>不用插槽</h3>
    <ChildOne />

    <h3>v-slot 具名插槽</h3>
    <NamedSlot />

    <h3>动态插槽名</h3>
    <DynamicSlot />

    <h3>作用域插槽</h3>
    <ScopeSlot />

    <h3>render 和插槽</h3>
    <Render />
  </div>
</template>

<script>
// import Computed from './component/computed.vue'
import ChildOne from './component/ChildOne.vue'
import NamedSlot from './component/NamedSlot.vue'
import DynamicSlot from './component/DynamicSlot.vue'
import ScopeSlot from './component/ScopeSlot.vue'
import Render from './component/Render.vue'

export default {
  name: 'SlotRender',
  components: {
    ChildOne,
    NamedSlot,
    DynamicSlot,
    ScopeSlot,
    Render,
  },
  data() {
    return {
    }
  },
  created() { },
  mounted() { },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
