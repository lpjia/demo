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
import ExportSetup from "./component/ExportSetup.vue"
import ScriptSetup from "./component/ScriptSetup.vue"
import ZuheshiApi from "./component/ZuheshiApi.vue"
</script>

<template>
  <ScriptSetup />
  <ExportSetup />
  <hr>
  <ZuheshiApi />
</template>