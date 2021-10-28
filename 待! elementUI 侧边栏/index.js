
new Vue({
  el: '#app',
  data: {
    isCollapse: false,
    // defaultActive
  },
  computed: {
  },
  methods: {
    openMenu(index) {
      // if (this.$router.options.routes[index].name === '消防管理') this.isShowDot = false
    },
    closeMenu(index) {
      // if (this.$router.options.routes[index].name === '消防管理') this.isShowDot = true
    },
  }
})