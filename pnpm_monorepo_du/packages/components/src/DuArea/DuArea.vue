<template>
  <div class="du-area">
    <div class="num">
      <span>Number 1</span>
      <input v-model="n1" data-testid="n1" type="text" />
    </div>
    <div class="num">
      <span>Number 2</span>
      <input v-model="n2" data-testid="n2" type="text" />
    </div>
    <div class="sum">
      <span data-testid="result">sum:{{ result }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { sum } from "@pnpm_monorepo_du/utils";

const n1 = ref(1);
const n2 = ref(2);
const result = computed(() => sum(+n1.value, +n2.value));
</script>

<style scoped>
.du-area {
  border: 1px solid #eee;
  padding: 20px;
}

.num {
  margin: 1em 0;
}

.sum {
  color: deepskyblue;
}
</style>
