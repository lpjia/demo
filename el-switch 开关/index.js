new Vue({
  el: '#app',
  data: {
    switchVal: false,
    switchVal_2: 'No',
    switchVal_3: -1,
  },
  computed: {
  },
  methods: {
    getVal(){
      console.log('switchVal:', this.switchVal)
    },
    getVal_2(){
      console.log('switchVal_2:', this.switchVal_2)
    },
    getVal_3(){
      console.log('switchVal_3:', this.switchVal_3)
    },
  }
})