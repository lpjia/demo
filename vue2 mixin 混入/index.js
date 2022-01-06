import mixin_sensorState from './mixins/sensorState.js'

const vue = new Vue({
  el: '#app',
  mixins: [mixin_sensorState],
  data: {
    // 可以省略变量
    /* allFireSensorStateObj: {},
    allFireSensorStateArr: [], */
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
})