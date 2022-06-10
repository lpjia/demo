<template>
  <div>
    <h1>
      <slot></slot>
    </h1>
    <h2>
      <slot name="one"></slot>
    </h2>
    <h3>
      <slot name="two" data="直接写属性"></slot>
    </h3>
    <h4>
      <slot name="three" :data="childData"></slot>
    </h4>
    <Child4Child>
      <template #five="xxx">
        插槽在多级组件中传递<br>
        {{ xxx }}<br>
        {{ xxx.msg }}<br>
        <slot name="four"></slot>
      </template>
    </Child4Child>
  </div>
</template>

<script>
import Child4Child from "./Child4Child.vue";

export default {
  name: 'Child4',
  components: {
    Child4Child
  },
  data() {
    return {
      childData: 'Child4.vue 通过插槽传的数据'
    };
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
