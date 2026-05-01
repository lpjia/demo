<template>
  <div>
    <h1>
      <slot></slot>
    </h1>
    <h2>
      <slot name="first"></slot>
    </h2>
    <h3>
      <slot name="second" data="直接写属性"></slot>
    </h3>
    <h4>
      <slot name="third" :data="childData"></slot>
    </h4>

    <SlotChild>
      <template #fifth="xxx">
        插槽在多级组件中传递<br>
        {{ xxx }}<br>
        {{ xxx.msg }}<br>
        <slot name="fourth"></slot>
      </template>
    </SlotChild>
    <el-divider></el-divider>
  </div>
</template>

<script>
import SlotChild from './SlotChild.vue'

export default {
  name: 'ElevenSlot',
  components: {
    SlotChild
  },
  props: {

  },
  data() {
    return {
      childData: '子组件通过插槽传的数据'
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
h2 {
  color: deepskyblue;
}
h3 {
  color: deeppink;
}
h4 {
  color: rgb(76, 221, 57);
}
</style>
