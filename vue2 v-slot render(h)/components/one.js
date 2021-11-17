// 局部注册
const childOne = {
  data() {
    return {
      name: 'this is childOne'
    }
  },
  components: {
  },
  created() {
    // console.log('子组件 child-one created()')
  },
  mounted() {
    // console.log('子组件 child-one mounted()')
  },
  beforeDestroy() {
  },
  methods: {
  },
  // https://cn.vuejs.org/v2/api/#slot
  // 作用域插槽, 绑定的任何数据, 都会被合并到一个 obj 里面
  template: `<div>
                我是子组件
                <div><slot>我是默认插槽: {{ name }}</slot></div>
                <div><slot name="slot_1" :data="'绑定的数据: ' + name">我是 slot_1 插槽: {{ name }}</slot></div>
                <div><slot name="slot_2" data="直接写属性">我是 slot_2 插槽: {{ name }}</slot></div>
             </div>`,
  // render 详细使用请查看本页面引入的全局组件那的 index.js
  // createElement('h1', '一级标题') 也就是 h() 返回的是 VNode
  /*
  render(h) {
    return h('section', {
    },
    )
  } */
}