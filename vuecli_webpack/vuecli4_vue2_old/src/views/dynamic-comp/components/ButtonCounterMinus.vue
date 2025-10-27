<template>
  <button v-on:click="count--" class="btn_gutter">&nbsp; You clicked me {{ count }} times. I'm count--
    &nbsp;</button>
</template>

<script>
export default {
  name: 'ButtonCounterMinus',
  props: ['prop_count'],
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    this.count = this.prop_count
  },
};
</script>
