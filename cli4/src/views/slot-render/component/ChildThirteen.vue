<script>
import SlotTransmitMethod from './SlotTransmitMethod.vue'

export default {
  name: 'ChildThirteen',
  components: {
    SlotTransmitMethod
  }
};
</script>

<template>
  <div>
    <SlotTransmitMethod>
      <template #default="{fn, fn_2, shuxing, pointerStyle}">
        <h1 @click="fn" :style="pointerStyle">fn()</h1>
        <h2 @click="fn_2" :style="pointerStyle">fn_2()</h2>
        <h3>{{ shuxing }}</h3>
      </template>
    </SlotTransmitMethod>
    <el-divider></el-divider>
  </div>
</template>