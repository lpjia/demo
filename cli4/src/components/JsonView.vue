<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'JsonView',
  components: {
    JsonViewer
  },
  props: ['val'],
};
</script>

<template>
  <div class="treeSection">
    <JsonViewer :value="val" :expand-depth="10" />
  </div>
</template>

<style scoped lang="scss">
</style>
