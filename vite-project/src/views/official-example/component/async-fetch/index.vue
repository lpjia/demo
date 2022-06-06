<script lang="ts" setup>
import { useFetch } from './fetch';

const baseUrl = 'http://rap2api.taobao.org/app/mock/288967'
const url = ref(baseUrl + '/api/random')

const { data, error } = useFetch(url)
.3 +
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>

<style lang="scss" scoped>
</style>
