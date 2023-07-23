<template>
  <div class="my-input">
    <el-input ref="inpt" v-bind="$attrs">
      <template v-for="(value, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
import { ElInput } from 'element-plus';

export default {
  components: {
    ElInput,
  },
  /* $attrs会得到父组件传给子组件的除props声明外的所有属性和方法
  也就是props如果声明了, 会占用一些, 排除掉后余下的都会在$attrs中 */
  // props:[],
  created() {
    // console.log(this.$attrs)
    // console.log(this.$slots)
  },
  mounted() {
    // console.log(this.$refs.inpt)

    /* 把ui组件的所有成员提到当前实例 */
    const entries = Object.entries(this.$refs.inpt);
    // console.log(entries)
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
