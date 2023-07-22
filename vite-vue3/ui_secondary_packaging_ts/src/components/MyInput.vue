<template>
  <div class="my-input">
    <el-input ref="inpt" v-bind="$attrs">
      <template v-for="(_value, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
import { ElInput } from 'element-plus';

export default {
  components: { ElInput },
  mounted() {
    const entries = Object.entries(this.$refs.inpt);
    console.log(entries)
    for (const [key, value] of entries) {
      this[key] = value;
    }
  }
}
</script>

<style scoped lang="scss">
.my-input {
  transition: .3s;

  &:hover,
  &:focus-within {
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, .3));
  }
}
</style>
