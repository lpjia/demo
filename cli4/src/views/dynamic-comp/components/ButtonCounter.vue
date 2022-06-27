<template>
  <button v-on:click="count++" class="btn_gutter">&nbsp; You clicked me {{ count }} times. I'm count++
    &nbsp;</button>
</template>

<script>
export default {
  name: 'ButtonCounter',
  props: {
    prop_count: {
      type: Number,
      required: true
    }
  },
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
