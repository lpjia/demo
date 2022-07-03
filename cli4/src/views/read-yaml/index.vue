<script>
// 用插槽来写
// 因为有很多共用组件
// 开始习惯把 script 写在上面

// import Home from '@/components/Home.vue';
import YAML from '@/utils/yaml/one.yaml'
import JSONdata from '@/utils/json/one.json'
import YAML_2 from '@/utils/yaml/two.yaml'
import YAML_3 from '@/utils/yaml/three.yaml'

import JsonViewer from 'vue-json-viewer'

export default {
  name: 'ReadYaml',
  components: {
    JsonViewer
  },
  props: {

  },
  data() {
    return {
      YAML,
      JSONdata,
      YAML_2,
      YAML_3,
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
    // console.log('YAML: ', YAML)
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<template>
  <div>
    <h3>读取 YAML 文件, 可作为配置文件, 比 json 支持更多</h3>
    <section class="treeSection">
      <JsonViewer :value="YAML" :expand-depth="10" />
    </section>
    <h3>两种不同文件对比 ↑ ↓</h3>
    <section class="treeSection">
      <JsonViewer :value="JSONdata" :expand-depth="10" />
    </section>

    <h3>yaml 复用某节点数据 变量</h3>
    <section class="treeSection">
      <JsonViewer :value="YAML_2" :expand-depth="10" />
    </section>
    <h3>yaml 复用某节点数据 变量</h3>
    <section class="treeSection">
      <JsonViewer :value="YAML_3" :expand-depth="10" />
    </section>
  </div>
</template>
