<!-- <script lang="ts">
import ExportSetup from "./component/export-setup.vue"
import ScriptSetup from "./component/script-setup.vue"

export default {
  name: 'compare-setup',
  components: {
    ExportSetup,
    ScriptSetup
  },
  setup() {

    return {}
  }
}
</script> -->

<script lang="ts" setup>
import ExportSetup from "./component/export-setup.vue"
import ScriptSetup from "./component/script-setup.vue"
</script>


<template>
  <ScriptSetup />
  <ExportSetup />
</template>

<style lang="scss" scoped>
</style>
