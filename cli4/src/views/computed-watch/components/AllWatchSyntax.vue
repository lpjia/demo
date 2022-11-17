<script>
export default {
  name: 'AllWatchSyntax', // watch 语法大全
  data() {
    return {
      obj: {
        one: 100,
        two: 200,
      },
      num: 1,
    };
  },
  watch: {
    // 简写形式
    num(val, oldVal) {
      console.log('val:', val)
      console.log('oldVal:', oldVal)
    },
    // 完整形式
    obj: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        // 默认执行方法
        // this 指向此组件
        // 这里不能对 obj 赋值, 原因是监听到改变后, 会死循环
        // 可以取值
        console.log(this.obj.one)
        // console.log('val:', val)
        // console.log('oldVal:', oldVal)
      }
    },
    // 使用字符串形式监听, 比深度监听减少性能开销
    // 不需要 deep: true
    'obj.two': {
      immediate: true,
      handler(val, oldVal) {
        console.log('val:', val)
        console.log('oldVal:', oldVal)
      }
    },
    // 监听路由
    '$route': {
      immediate: true, // 必须有, 要不然监听不到
      handler(to, from) {
        // to 监听到的其他页面到此组件所在页面的跳转, to 就是此组件所在页面的路由
        // from 一直是 undefined
        console.log('to:', to)
        console.log('from:', from)
      }
    }
  },
  methods: {
    toOtherPage() {
      this.$router.push('/TemplateSyntax')
    }
  },
};
</script>

<template>
  <div>
    <span class="inlineB">{{ obj }}</span>
    <button class="inlineB marginLB" @click="obj.two++">obj.two++</button>
    <span class="inlineB marginLB">{{ num }}</span>
    <button class="inlineB marginLB" @click="num++">num++</button>
    <button class="inlineB marginLB" @click="toOtherPage">toOtherPage() 调用, 也监听不到 $route 的变化</button>
  </div>
</template>

<style scoped lang="scss">
</style>
