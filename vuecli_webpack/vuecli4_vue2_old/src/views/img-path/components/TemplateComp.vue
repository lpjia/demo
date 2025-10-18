<script>
export default {
  name: 'TemplateComp',
  props: {
    arr: Array
  },
};
</script>

<template>
  <div class="compRoot">
    <section v-for="item in arr" :key="item.path">
      <!-- <li>{{ item.path }}</li> -->
      <img :src="require('@/assets/' + item.path)" />
    </section>
  </div>
</template>
