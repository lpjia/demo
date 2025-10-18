<script>
// 用插槽来写
// 因为有很多共用组件
// 开始习惯把 script 写在上面



import YAML from '@/utils/yaml/one.yaml'
import JSONdata from '@/utils/json/one.json'
import YAML_2 from '@/utils/yaml/two.yaml'
import YAML_3 from '@/utils/yaml/three.yaml'
import YAML_4 from '@/utils/yaml/four.yaml'
import YAML_5 from '@/utils/yaml/five.yaml'

import JsonViewer from 'vue-json-viewer'
// import JsonView from '../../components/JsonView.vue'
import JsonView from '@/components/JsonView.vue'

export default {
  name: 'ReadYaml',
  components: {
    JsonViewer,
    JsonView,
  },
  data() {
    return {
      YAML,
      JSONdata,
      YAML_2,
      YAML_3,
      YAML_4,
      YAML_5,
    };
  },
  mounted() {
    console.log(YAML_5)
  },
  methods: {
    log(e) {
      console.log(e)
    },
  }
};
</script>

<template>
  <div>
    <h3>读取 YAML 文件, 可作为配置文件, 比 json 支持更多, 两种不同文件对比 ← →</h3>
    <section class="sec">
      <div class="left">
        <h3 @click="log">yaml 配置文件</h3>
        <div class="ctt">
          <JsonView :val="YAML" :notib="true" />
        </div>
      </div>
      <div class="right">
        <h3>json 配置文件</h3>
        <div class="ctt">
          <JsonView :val="JSONdata" :notib="true" />
        </div>
      </div>
    </section>

    <h3>yaml 复用某节点数据 变量</h3>
    <JsonView :val="YAML_2" />
    <JsonView :val="YAML_3" />
    <JsonView :val="YAML_4" />
    <JsonView :val="YAML_5" />

  </div>
</template>

<style lang="scss" scoped>
.sec {
  display: flex;
  justify-content: space-between;
}
</style>