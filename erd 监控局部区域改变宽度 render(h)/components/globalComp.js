// 全局注册
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  created() {
    console.log('子组件 button-counter created()')
  },
  mounted() {
    console.log('子组件 button-counter mounted()')
  },
  template: '<button v-on:click="count++" class="btn_gutter">You clicked me {{ count }} times.</button>'
})