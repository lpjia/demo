<script>
import mixin from '../mixins/mixin'

export default {
  name: 'KeyModifier', // 按键修饰符
  mixins: [mixin],
  data() {
    return {
      enter: 'this is enter',
    };
  },
};
</script>

<template>
  <div>
    <p>
      <el-input @keyup.enter.native="doSomething('this is doEnterNative')" v-model="enter" style="width: 200px;">
      </el-input> el-input 在绑定原生事件必须使用 .native 修饰符
    </p>
    <p><input @keyup.enter="doSomething('this is doEnter')" value="enter" /> 原生 input 不用加 .native 修饰符</p>
    <p>----分割线----</p>

    <p>
      <input @keyup.page-down="doSomething('this is doPageDown')" value="page-down" />
      <input @keyup.delete="doSomething('this is doDelete')" value="delete" />
      <input @keyup.esc="doSomething('this is doEsc')" value="esc" />
      <input @keyup.space="doSomething('this is doSpace')" value="space" />
      <input @keyup.up="doSomething('this is doUp')" value="up" />
      <input @keyup.down="doSomething('this is doDown')" value="down" />
      <input @keyup.left="doSomething('this is doLeft')" value="left" />
      <input @keyup.right="doSomething('this is doRight')" value="right" />
    </p>

    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
</style>
