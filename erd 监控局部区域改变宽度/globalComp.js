// 全局注册
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++" class="btn_gutter">You clicked me {{ count }} times.</button>'
})