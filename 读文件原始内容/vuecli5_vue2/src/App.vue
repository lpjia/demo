<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <img :src="dataurl" alt="" />
  </div>
</template>

<script>
import dataurl from "./img.dataurl";
// import dataurl from "./assets/base64/img.dataurl";

export default {
  name: "App",
  data() {
    return {
      dataurl,
    };
  },
};
</script>
