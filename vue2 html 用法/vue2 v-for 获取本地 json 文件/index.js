const vue = new Vue({
  el: '#app',
  data: {
    sensorSum: [],
    parentMessage: 'Parent',
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }

  },
  computed: {
    sensorSumSplit() {
      return this.sensorSum.length > 5 ? 5 : this.sensorSum.length
    },

  },
  created() {
  },
  mounted() {
    this.init()
    console.log(Object.keys(this.myObject))
  },
  methods: {
    /**
     * 
     */
    init() {
      this.getList()
    },
    async getList() {
      let response = await fetch('list.json');
      if (!response.ok) throw new Error('response failed')
      let res = await response.json();
      // console.log('res: ', res)
      this.sensorSum = res
    },
  }
})