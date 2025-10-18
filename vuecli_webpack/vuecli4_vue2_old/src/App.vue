<template>
  <div id="app">
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
  },
  mounted() {
    console.log("process.env.NODE_ENV:",
      process.env.NODE_ENV
    )
    console.log("process.env.BASE_URL:",
      process.env.BASE_URL
    )
    console.log("process.env.VUE_APP_BASE_API:",
      process.env.VUE_APP_BASE_API
    )
    console.log("process.env.VUE_APP_COMMON:",
      process.env.VUE_APP_COMMON
    )
  }
}
</script>
