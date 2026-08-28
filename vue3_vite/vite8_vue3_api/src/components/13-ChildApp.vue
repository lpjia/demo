<template>
  <!-- $event 就是原生js的事件对象event, 得配合原生事件(这里是click) -->
  <button @click="$emit('zdyHandle', $event)">click me</button>
</template>

<script setup></script>

<style scoped></style>
