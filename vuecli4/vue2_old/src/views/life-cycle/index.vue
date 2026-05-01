<script>
import LifeCycle from './components/LifeCycle.vue';

export default {
  name: 'life-cycle',
  components: {
    LifeCycle
  },
  props: {
  },
  data() {
    return {
      showLife: true
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    switchTF(){
      
    }
  },
};
</script>

<template>
  <div>
    <button @click="showLife = !showLife">切换查看子组件生命周期钩子情况</button>
    <LifeCycle v-if="showLife" />
  </div>
</template>

<style scoped lang="scss">
</style>
