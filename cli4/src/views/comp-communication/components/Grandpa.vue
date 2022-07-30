<script>
import Grand from './Grand.vue';
export default {
  name: 'Grandpa',
  components: {
    Grand
  },
  // 隔代通信, 这种代码侵入性小, 首尾组件加上即可
  provide: {
    foo: 'bar'
  },
};
</script>

<template>
  <div>
    <Grand v-bind="$attrs" v-on="$listeners" />
  </div>
</template>