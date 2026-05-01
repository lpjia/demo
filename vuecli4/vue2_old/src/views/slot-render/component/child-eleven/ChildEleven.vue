<template>
  <div>
    <ElevenSlot>
      <template #default>
        默认插槽
      </template>

      <template #first>
        first 插槽
      </template>

      <template v-slot:second="slotData">
        second 插槽<br>
        {{ slotData }}<br>
        {{ slotData.data }}
      </template>

      <template #third="slotData">
        third 插槽<br>
        {{ slotData }}<br>
        {{ slotData.data }}
      </template>

      <template #fourth>
        fourth 插槽
      </template>
    </ElevenSlot>
  </div>
</template>

<script>
import ElevenSlot from './ElevenSlot.vue'

export default {
  name: 'ChildEleven',
  components: {
    ElevenSlot
  },
  props: {

  },
  data() {
    return {

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

<style scoped lang="scss">
</style>
