<script>
import Son from './Son.vue';
import SonYi from './SonYi.vue';
export default {
  name: 'Father',
  components: {
    Son,
    SonYi
  },
  props: {
  },
  data() {
    return {
      bindData: true,
      dataToFather: null,
      gouzi: '生命周期钩子传的字符串',
      dataDataByRef: null,

      dataPropByChildren: null,

      dataDataByFather: '测试 vm.$parent',
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.$bus.$emit('mountedToFatherBro', this.gouzi)

    // 父直接通过 $refs 调用子的方法, 还可以传值
    this.$refs.sonYi.fatherEmitSonYi('传值过去!')
  },
  methods: {
    getSonData(data) {
      this.dataToFather = data
    },

    sendBrother() {
      this.$bus.$emit('dataToFatherBro', this.dataToFather)
    },

    changeBindData() {
      this.bindData = !this.bindData
    },

    getSonYiDataByRef() {
      // 父直接通过 $refs 取子的 data 中的数据
      this.dataDataByRef = this.$refs.sonYi.msg
      // console.log('this.$refs.sonYi:', this.$refs.sonYi)
    },

    get$Children() {
      // console.log(this.$children)
      let target = null
      /**
       * 精准找某特定的子组件
       * 用组件标签名 child.$options._componentTag
       * 用组件 name, child.$options.name
       */
      for (const child of this.$children) {
        if (child.$options.name === 'Son') {
          console.log("child:",
            child
          )
          console.log("child.$data:",
            child.$data
          )
          console.log("child.$data.dataForData:",
            child.$data.dataForData
          )
          console.log("child.$props:",
            child.$props
          )
          console.log("child.$props.notBind:",
            child.$props.notBind
          )
          console.log("child.$options:",
            child.$options
          )
          console.log(" child.$options.customOption:",
            child.$options.customOption
          )
          target = child
        }
      }

      this.dataPropByChildren = target.$props.bindData
    },
  },
};
</script>

<template>
  <div>
    <p>父 bindData: {{ bindData }}</p>
    <Son :bindData="bindData" notBind="没有绑定的 string 类型数据" @getSonData="getSonData" />
    <p>子→父的数据: {{ dataToFather }}</p>

    <button @click="changeBindData">改变绑定到子的数据</button>
    <button @click="sendBrother" class="marginLB">父→父弟</button>

    <p>($refs)</p>
    <SonYi ref="sonYi" />
    <button @click="getSonYiDataByRef">父直接用子的值: {{ dataDataByRef }}</button>

    <p>($parent $children $root)</p>
    <button @click="get$Children">访问子实例的数据: {{ dataPropByChildren }}</button>
  </div>
</template>

<style scoped lang="scss">
</style>
