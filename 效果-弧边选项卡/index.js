new Vue({
  el: '#app',
  data() {
    return {
      isActive: true,
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive
    }
  }
})