const vm = new Vue({
  el: '.container',
  data() {
    return {
      title: '淘贝商城',
      goods: R.clone(goods)
    }
  },
  computed: {
    total() {
      let t = 0
      for (const item of this.goods) {
        t += item.choose
      }
      return t
    }
  }
})