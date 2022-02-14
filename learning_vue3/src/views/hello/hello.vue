<template>
  <div>
    <img alt="Vue logo" src="@/assets/logo.png" />
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Zh />
  <Zhh />
  <Xxs />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Zh from '@/views/zuhe/zh.vue'
import Zhh from '@/views/zuhe/zh2.vue'
import Xxs from '@/views/zuhe/xxs.vue'

export default {
  name: 'hello',
  components: {
    HelloWorld, Zh, Zhh,
    Xxs
  }
}
</script>