const vm = new Vue({
  el: '#app',
  data: {
    tabIdx: 1,
    tabs: [
      { name: '本周' },
      { name: '当月' },
      { name: '本年' },
    ]
  },
  methods: {
    switchTab(idx) {
      this.tabIdx = idx
    },
  }
})