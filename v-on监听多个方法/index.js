const vm = new Vue({
  el: '#app',
  methods: {
    onInput() {
      console.log('onInput()')
    },

    onFocus() {
      console.log('onFocus()')
    },

    onBlur() {
      console.log('onBlur()')
    }
  }
})