<template>
  <h3>{{ num }}</h3>
  <p>{{ type }}</p>
  <button @click="stopTimer">click</button>
  <Child :msg="type" />
  <hr />
</template>

<script>

import autoAddNum from './composables/autoAddNum'
import Child from './components/child.vue'

export default {
  name: 'two',
  components: {
    Child
  },
  setup() {

    return {
      ...(autoAddNum()),
    }
  }
}
</script>

<style scoped>
</style>