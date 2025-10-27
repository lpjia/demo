<script>
export default {
  name: 'LifeCycleChild',
  components: {
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
    console.log('LifeCycleChild beforeCreate')
  },
  created() {
    console.log('LifeCycleChild created')
  },
  beforeMount(){
    console.log('LifeCycleChild beforeMount')
  },
  mounted() {
    console.log('LifeCycleChild mounted')
  },
  beforeUpdate(){
    console.log('LifeCycleChild beforeUpdate')
  },
  updated(){
    console.log('LifeCycleChild updated')
  },
  beforeDestroy(){
    console.log('LifeCycleChild beforeDestroy')
  },
  destroyed(){
    console.log('LifeCycleChild destroyed')
  },
  methods: {
  },
};
</script>

<template>
  <div>    
    <div class="life">孙组件</div>
  </div>
</template>

<style scoped lang="scss">
.life {
  color: deepskyblue
}
</style>
