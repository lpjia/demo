<template>
  <div id="app">
    <!-- <router-view style="height: 2000px;" /> -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      rootData: 'app.vue'
    }
  }
}
</script>
