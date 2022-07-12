<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'JsonView',
  components: {
    JsonViewer
  },
  props: ['val', 'notib'],
};
</script>

<template>
  <div :class="{treeSection:!notib}">
    <JsonViewer :value="val" :expand-depth="10" />
  </div>
</template>