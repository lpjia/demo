<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <img :src="dataurl" alt="" />
  </div>
</template>

<script>
import dataurl from "./img.dataurl";

export default {
  name: "App",
  data() {
    return {
      dataurl,
    };
  },
};
</script>
