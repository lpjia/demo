<template>
  <div>
    <h3 class="up_down">{{ pageName }}</h3>
    <Child :send-child="sendChildData" zj="没有绑定的字符串数据" @getChildData="getChildData" />
    <p>{{ fromChildData }}</p>
    <hr class="up_down">
    <Child2 ref="domChild2" />
    <button @click="getChild2Data">获取子组件(child2.vue)的数据</button>
    <p>{{ fromChild2Data }}</p>
    <button @click="emitChild2Method">触发子组件(child2.vue)的方法</button>
    <hr class="up_down">
    <Child3 comp-name="child.vue" compDepthLevel="2" @event-jianting="jianting" @eventJt="jt" />
    <!-- <hr class="up_down">
    <Child4>这是插槽内容!</Child4>
    <hr class="up_down">
    <Child4>
      <template #default>
        默认插槽
      </template>
      <template #one>
        one 插槽
      </template>
      <template #two="slotData">
        two 插槽<br>
        {{ slotData }}<br>
        {{ slotData.data }}
      </template>
      <template #three="slotData">
        three 插槽<br>
        {{ slotData }}<br>
        {{ slotData.data }}
      </template>
      <template #four>
        four 插槽
      </template>
    </Child4> -->
    <hr class="up_down">
    <Child5 @mounted="jtChildLifeCycle" />
    <p>父组件监听子组件的生命周期</p>
    <Child6 @hook:mounted="jtChildLifeCycle2" />
    <b>@hook:mounted 的优势是不改动子组件</b>

  </div>
</template>

<script>
import Child from "@/views/four/components/Child.vue";
import Child2 from "@/views/four/components/Child2.vue";
import Child3 from "@/views/four/components/Child3.vue";
// import Child4 from "@/views/four/components/Child4.vue";
import Child5 from "@/views/four/components/Child5.vue";
// import Child6 from "@/views/four/components/Child6.vue";
import Child6 from "@/views/four/components/Child6.vue";
// import Child6 from "./components/Child6.vue";

export default {
  name: 'four',
  components: {
    Child,
    Child2,
    Child3,
    // Child4,
    Child5,
    Child6,
  },
  data() {
    return {
      pageName: 'four.vue',
      sendChildData: '这是給子组件(child.vue)的数据',
      fromChildData: '',

      fromChild2Data: '',
    };
  },
  provide: {
    foo: 'bar'
  },
  watch: {
    // 监听 $route
    $route: {
      immediate: true,
      handler(val, oldVal) {
        console.log('val:', val)
        console.log('oldVal:', oldVal)
      },
      deep: true
    }
  },
  created() {
    this.$bus.$on('fromChild3Child', data => {
      console.log(data)
    })
  },
  methods: {
    getChildData(data) {
      this.fromChildData = data
    },

    getChild2Data() {
      this.fromChild2Data = this.$refs.domChild2.child2Data
    },

    emitChild2Method() {
      this.$refs.domChild2.log()
    },

    jianting() {
      console.log('打印!')
    },
    jt() {
      console.log('再次打印!')
    },

    jtChildLifeCycle() {
      console.log('监听到子组件的生命周期后, 做些什么')
    },
    // 为了以示区分
    jtChildLifeCycle2() {
      console.log('父组件监听到 mounted 钩子函数 ...');
    },
  },
};
</script>

<style scoped lang="scss">
</style>
