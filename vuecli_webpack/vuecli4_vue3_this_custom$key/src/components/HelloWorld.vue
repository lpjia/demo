<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { fn } from "../utils/common";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    fn(this)
  },
  mounted() {
    console.log('组件 mounted', this) // this指向这个组件实例
  }
}
</script>