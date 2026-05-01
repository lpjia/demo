<script>
import PropType from './components/PropType.vue';
import PropVerification from './components/PropVerification.vue';
import UnidirectionalFlow from './components/UnidirectionalFlow.vue';
export default {
  name: 'LearningProp',
  components: {
    UnidirectionalFlow,
    PropType,
    PropVerification
  },
  data() {
    return {
      initialCounter: 0,
      propObj: {
        propA: 120,
        propB: 'propB',
        propC: 'propC',
        propF: 'success'
      }
    };
  },
  methods: {
    add() {
      this.initialCounter++
    },
    contactsPromise() {
      return new Promise((resolve, reject) => {
        this.initialCounter % 2 === 0 ?
          resolve('promise 传过去的值') :
          reject('error 出错传值')
      })
    }
  },
};
</script>

<template>
  <div>
    <h3>单向数据流</h3>
    <button @click="add" style="margin-bottom: 20px;">add</button>
    <!-- 子组件立即更新 prop 传的值 -->
    <UnidirectionalFlow :initialCounter="initialCounter" />

    <el-divider></el-divider>
    <h3>类型</h3>
    <PropType title="abc" type="test" name="lp" :likes="initialCounter" :isPublished="false" :commentIds="[100,200,300]"
      :author="{age: 29}" :callback="add" :contactsPromise="contactsPromise()" />

    <el-divider></el-divider>
    <h3>验证</h3>
    <!-- 也可以用对象把所有的 key 一起传过去, v-bind="obj", 子组件需要列出所有 key -->
    <PropVerification v-bind="propObj" />
  </div>
</template>