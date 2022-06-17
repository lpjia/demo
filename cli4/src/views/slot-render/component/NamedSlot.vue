<template>
  <div>
    <ChildOne>
      <template v-slot:slot_1>
        <!-- 这里注意是v-slot:子组件的插槽名 -->
        <!-- <slot> 元素作为组件模板之中的内容分发插槽。<slot> 元素自身将被替换。 -->
        template 是不渲染的, template 下的都会被替换
        <span style="color: deepskyblue;">替换了</span>
      </template>
    </ChildOne>
  </div>
</template>

<script>
import ChildOne from './ChildOne.vue'

export default {
  name: 'NamedSlot',
  components: {
    ChildOne
  },
};
</script>
