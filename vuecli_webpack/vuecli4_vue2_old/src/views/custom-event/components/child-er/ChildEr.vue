<script>
import CustomBtn from '../child-er/CustomBtn.vue';
import CustomInput from '../child-er/CustomInput.vue';

export default {
  name: 'ChildEr',
  components: {
    CustomInput,
    CustomBtn,
  },
  data() {
    return {
      msg: 'this is msg',
      num: 0,
    };
  },
  methods: {
    inputFn(e) {
      // console.log(e)
      this.msg = e.target.value
    },

    customInputFn(val) {
      // console.log(val)
      this.msg = val
    },
  },
};
</script>

<template>
  <div>
    <section>
      <input type="text" v-model="msg">
      <input type="text" :value="msg" @input="msg = $event.target.value" class="marginLB">
      <input type="text" :value="msg" @input="inputFn" class="marginLB">
    </section>
    <p>----分割线----</p>

    <p>v-model 封装自定义组件</p>
    <CustomInput v-model="msg" />
    <CustomInput :value="msg" @input="msg = $event" class="marginLB" />
    <CustomInput :value="msg" @input="customInputFn" class="marginLB" />
    <p>----分割线----</p>

    <p>v-model 封装自定义组件 双向绑定</p>
    <span>num: {{ num }}</span>
    <CustomBtn v-model="num" @input="num = $event" />
    <p>----分割线----</p>
  </div>
</template>
