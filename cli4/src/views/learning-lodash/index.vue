<script>
import Obj from './components/Obj.vue';
import YuYan from './components/YuYan.vue';
import Num from './components/Num.vue';
import Str from './components/Str.vue';
import Arr from './components/Arr.vue';
import JsonView from '../../components/JsonView.vue';
// import { cloneDeep } from 'lodash'
// import cloneDeep from "lodash/cloneDeep";
// import _get from "lodash/get";

export default {
  name: 'LearningLodash',
  components: {
    Obj,
    YuYan,
    Num,
    Str,
    Arr,
    JsonView
  },
  props: {
  },
  data() {
    return {
      arr: [
        { name: 'xm', id: 1 },
        { name: 'xc', id: 11 },
        { name: 'xz', id: 111 },
      ],
      obj: {
        'a': [
          {
            'b': {
              'c': 3
            }
          }
        ]
      },

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
  },
};
</script>

<template>
  <div>
    <Obj :obj="obj" />

    <YuYan :arr="arr" />

    <Num />
    <el-divider></el-divider>
    <Str />
    <Arr :arr="arr" />
    <!-- <json-view :val="arr" /> -->

  </div>
</template>

<style scoped lang="scss">
</style>
