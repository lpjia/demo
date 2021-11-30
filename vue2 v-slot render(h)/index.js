const vm = new Vue({
  el: '#app',
  data: {
    dynamicSlotList: [
      { slotName: 'default' },
      { slotName: 'slot_1' },
      { slotName: 'slot_2' },
    ],
    dynamic: 'default'
  },
  components: {
    'child-one': childOne,
    'child-two': childTwo,
    // 局部组件封装后就是个 obj, template 是其属性, 下一行代码写法没毛病
    'base-layout': { template: '#test-template' },
    'hx-comp': hxComp,
    'blog-post': blogPost,
    'child-three': childThree,
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    switchSlot(slotName) {
      this.dynamic = slotName
    }
  }
})