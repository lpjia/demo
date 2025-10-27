<script>
import LifeCycleChild from './LifeCycleChild.vue';

export default {
  name: 'Life',
  components: {
    LifeCycleChild
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  beforeCreate(){
    console.log('LiftCycle beforeCreate')
  },
  created() {
    console.log('LiftCycle created')
  },
  beforeMount(){
    console.log('LiftCycle beforeMount')
  },
  mounted() {
    console.log('LiftCycle mounted')
  },
  beforeUpdate(){
    console.log('LiftCycle beforeUpdate')
  },
  updated(){
    console.log('LiftCycle updated')
  },
  beforeDestroy(){
    console.log('LiftCycle beforeDestroy')
  },
  destroyed(){
    console.log('LiftCycle destroyed')
  },
  methods: {
  },
};
</script>

<template>
  <div>    
    <div class="life">子组件</div>
    <LifeCycleChild />
  </div>
</template>

<style scoped lang="scss">
.life {
  color: deepskyblue
}
</style>
