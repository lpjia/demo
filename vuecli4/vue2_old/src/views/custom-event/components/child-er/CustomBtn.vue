<script>
export default {
  name: 'CustomBtn',
  props: {
    value: Number
  },
};
</script>

<template>
  <div>
    <span>value: {{ value }}</span>
    <button @click="$emit('input', value +1)" class="marginLB">value +1</button>
  </div>
</template>
