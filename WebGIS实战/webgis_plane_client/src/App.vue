<template>
<div class="map" ref="mapRef"></div>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue';
import { initMap } from './map';

const mapRef = useTemplateRef('mapRef');
onMounted(() => {
  initMap(mapRef.value);
});
</script>

<style scoped>
.map {
  position: fixed;
  inset: 0;
}
</style>