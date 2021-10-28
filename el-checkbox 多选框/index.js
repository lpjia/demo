new Vue({
  el: '#app',
  data: {
    checkVal: true,
    switchVal: false,

    groupCheckVal: [],
  },
  computed: {
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 
     */
    init() {
      setTimeout(() => {
        this.groupCheckVal = ['复选框 A', 'B']
      }, 2000);
    },
    /**
     * 本想着用 change 事件来控制, 实际上不需要了
     */
    switchCheckboxDisabled(val) {
      console.log('val: ', val)
    },
    /**
     * 组
     */
    handleGroupChange(val) {
      console.log('val: ', val)
    }
  }
})