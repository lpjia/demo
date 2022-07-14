<script>
export default {
  name: 'CustomInput',
  props: {
    value: String
  },
};
</script>

<template>
  <div class="inlineB">
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>
