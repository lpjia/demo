<template>
  <div>
    <section>这是来自父组件(four.vue)的数据: <br>
      <span>{{ sendChild }}</span><br>
      <span>{{ zj }}</span><br>
      <button @click="sendFather">发送数据给父组件(four.vue)</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Child',
  // props: {
  //   // sendChild: {
  //   //   require: true,
  //   //   type: String,
  //   // },
  //   // zj, // 上接此行写法, 直接报错, 用下不报错
  //   // zj: {
  //   //   require: true,
  //   //   type: String,
  //   // },
  // },
  props: ['sendChild', 'zj'],
  data() {
    return {
      sendFatherData: '来自子组件(child.vue)的数据',
    };
  },
  methods: {
    sendFather() {
      this.$emit('getChildData', this.sendFatherData)
    }
  },
};
</script>

<style scoped lang="scss">
</style>
